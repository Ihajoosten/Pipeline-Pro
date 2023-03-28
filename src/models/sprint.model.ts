import { ISprintState } from "../state-pattern/interface/ISprintState";
import { BacklogItem } from "./backlogItem.model";
import { LeadDeveloper, User } from "./user.model";
import { SprintCreatedState } from "../state-pattern/states/sprint-states/created.state";
import { SprintActiveState } from "../state-pattern/states/sprint-states/active.state";
import { Pipeline } from "./pipeline.model";
import { ScrumRole } from "./enumerations";
import { BacklogDoneState } from "../state-pattern/states/backlog-states/done.state";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { Notification } from "./notification.model";

export class Sprint implements ISubject {
  public _name: string;
  public _startDate: Date;
  public _endDate: Date;
  private _createdBy: User;
  private _createdAt: Date;
  private _productOwner: User;
  private _scrumMaster: User;
  private _pipeline: Pipeline;
  private _backlogItems: Array<BacklogItem> = [];
  private _state: ISprintState;
  private _observers: Array<IObserver> = [];

  constructor(
    name: string,
    startDate: Date,
    endDate: Date,
    createdBy: User,
    productOwner: User,
    scrumMaster: User,
    pipeline: Pipeline
  ) {
    this._name = name;
    this._startDate = startDate;
    this._endDate = endDate;
    this._createdBy = createdBy;
    this._createdAt = new Date(Date.now());
    if (productOwner.getRole() !== ScrumRole.PRODUCT_OWNER)
      throw new Error("Invalid product owner!");
    this._productOwner = productOwner;
    if (scrumMaster.getRole() !== ScrumRole.SCRUM_MASTER)
      throw new Error("Invalid scrum master!");
    this._scrumMaster = scrumMaster;
    this._pipeline = pipeline;
    this._state = new SprintCreatedState(this);
  }

  public getCreationInfo(): string {
    return `${this._createdBy} - ${this._createdAt}`;
  }

  public getScrumMaster(): User {
    return this._scrumMaster;
  }

  public getBacklogItems(): BacklogItem[] {
    return this._backlogItems;
  }

  public addBacklogItem(leadDeveloper: User, backlogItem: BacklogItem): void {
    if (leadDeveloper.getRole() !== ScrumRole.LEAD_DEVELOPER)
      throw new Error("Only lead developers can add backlog items!");
    this._backlogItems.push(backlogItem);
  }

  public removeBacklogItem(user: User, backlogItem: BacklogItem): void {
    if (!(user instanceof LeadDeveloper)) {
      throw new Error("Only Lead Developers can remove backlog items.");
    }
    const index = this._backlogItems.indexOf(backlogItem);
    if (index !== -1) {
      this._backlogItems.splice(index, 1);
    }
  }

  public setState(state: ISprintState): void {
    this._state = state;
  }

  public getState(): ISprintState {
    return this._state;
  }

  public updateSprint(
    name?: string,
    startDate?: Date,
    endDate?: Date,
    scrumMaster?: User,
    pipeline?: Pipeline
  ): void {
    if (this._state instanceof SprintActiveState) {
      throw new Error("Cannot update sprint because it has already started!");
    }
    if (this._pipeline.isRunning()) {
      throw new Error("Cannot update sprint because the pipeline is running!");
    }
    if (name) this._name = name;
    if (startDate) this._startDate = startDate;
    if (endDate) this._endDate = endDate;
    if (scrumMaster && scrumMaster.getRole() == ScrumRole.SCRUM_MASTER)
      this._scrumMaster = scrumMaster;
    if (pipeline) this._pipeline = pipeline;
  }

  public create(user: User): void {
    this.checkRole(user.getRole());
    this._state.create();
  }

  public start(user: User): void {
    this.checkRole(user.getRole());
    this._state.start();
  }

  public finish(user: User): void {
    this.checkRole(user.getRole());
    this._state.finish();
    this._pipeline.execute();
  }

  public release(user: User): void {
    this.checkRole(user.getRole());
    let maximumPoints = 0;
    let totalPoints = 0;
    this._backlogItems.forEach((backlogItem) => {
      maximumPoints += backlogItem._storyPoints;
      if (backlogItem.getState() instanceof BacklogDoneState) {
        totalPoints += backlogItem._storyPoints;
      }
    });
    if ((totalPoints / maximumPoints) * 100 >= 75) {
      this._pipeline.execute();
      this._state.release();
    } else {
      const notificationMessage = `Sprint: ${this._name} didn't have enough points to release the sprint!`;
      this.notify(new Notification(this._scrumMaster, notificationMessage));
      this.notify(new Notification(this._productOwner, notificationMessage));
    }
  }

  public review(user: User): void {
    this.checkRole(user.getRole());
    this._state.review();
  }

  public close(user: User): void {
    this.checkRole(user.getRole());
    this._state.close();
  }

  private checkRole(role: ScrumRole): void {
    if (role !== ScrumRole.SCRUM_MASTER) {
      throw new Error("Only the scrum master can perform this action!");
    }
  }

  public subscribe(observer: IObserver): void {
    this._observers.push(observer);
  }

  public unsubscribe(observer: IObserver) {
    const index = this._observers.indexOf(observer);
    if (index !== -1) {
      this._observers.splice(index, 1);
    }
  }

  public notify(notification: Notification) {
    for (const observer of this._observers) {
      observer.update(notification);
    }
  }
}
