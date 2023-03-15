import { ISprintState } from "../state-pattern/interface/ISprintState";
import { BacklogItem } from "./backlogItem.model";
import { LeadDeveloper, User } from "./user.model";
import { SprintCreatedState } from "../state-pattern/states/sprint-states/created.state";
import { SprintActiveState } from "../state-pattern/states/sprint-states/active.state";
import { Pipeline } from "./pipeline.model";
import { ScrumRole } from "./enumerations";

export class Sprint {
  private _id: number;
  private _name: string;
  private _startDate: Date;
  private _endDate: Date;
  private _scrumMaster: User;
  private _backlogItems: Array<BacklogItem>;
  private _state: ISprintState;
  private _pipeline: Pipeline;

  constructor(
    id: number,
    name: string,
    startDate: Date,
    endDate: Date,
    scrumMaster: User,
    pipeline: Pipeline
  ) {
    if (scrumMaster.getRole() !== ScrumRole.SCRUM_MASTER) {
      throw new Error("Invalid scrum master!");
    }
    this._id = id;
    this._name = name;
    this._startDate = startDate;
    this._endDate = endDate;
    this._scrumMaster = scrumMaster;
    this._state = new SprintCreatedState(this);
    this._backlogItems = new Array<BacklogItem>();
    this._pipeline = pipeline;
  }

  public getId(): number {
    return this._id;
  }

  public getName(): string {
    return this._name;
  }

  public getStartDate(): Date {
    return this._startDate;
  }

  public getEndDate(): Date {
    return this._endDate;
  }

  public getScrumMaster(): User {
    return this._scrumMaster;
  }

  // public addBacklogItem(partialBacklogItem: Omit<BacklogItem, "scrumMaster">) {
  //   const backlogItem = new BacklogItem(
  //     partialBacklogItem.id,
  //     partialBacklogItem.name,
  //     partialBacklogItem.description,
  //     this._scrumMaster
  //   );
  //   this._backlogItems.push(backlogItem);
  // }

  public getBacklogItems(): BacklogItem[] {
    return this._backlogItems;
  }

  // public removeBacklogItem(backlogItem: BacklogItem) {
  //   const index = this._backlogItems.indexOf(backlogItem);
  //   if (index !== -1) {
  //     this._backlogItems.splice(index, 1);
  //   }
  // }

  public addBacklogItem(
    user: User,
    partialBacklogItem: Omit<BacklogItem, "scrumMaster">
  ): void {
    if (!(user instanceof LeadDeveloper)) {
      throw new Error("Only Lead Developers can add backlog items.");
    }
    const backlogItem = new BacklogItem(
      partialBacklogItem.id,
      partialBacklogItem.name,
      partialBacklogItem.description,
      this._scrumMaster
    );
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
      throw new Error("Cannot update Sprint because it has already started!");
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
  }

  public release(user: User): void {
    this.checkRole(user.getRole());
    this._state.release();
  }

  public review(user: User): void {
    this.checkRole(user.getRole());
    this._state.review();
  }

  public close(user: User): void {
    this.checkRole(user.getRole());
    this._pipeline.execute();
    this._state.close();
  }

  public getSprintLength(): number {
    const diffTime = Math.abs(
      this._endDate.getTime() - this._startDate.getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  public isOverlapping(sprint: Sprint): boolean {
    return (
      this._startDate < sprint.getEndDate() &&
      this._endDate > sprint.getStartDate()
    );
  }

  private checkRole(role: ScrumRole): void {
    if (role !== ScrumRole.SCRUM_MASTER) {
      throw new Error("Only the scrum master can perform this action!");
    }
  }
}
