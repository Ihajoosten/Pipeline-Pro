import { IMessage } from "../adapter-pattern/interfaces/IMessage";
import { ISprintState } from "../state-pattern/interface/ISprintState";
import { BacklogItem } from "./backlogItem.model";
import { User } from "./user/user.model";
import { SprintCreatedState } from "../state-pattern/states/sprint-states/created.state";
import { SprintActiveState } from "../state-pattern/states/sprint-states/active.state";
import { Role } from "./user/roles";

export class Sprint {
  private scrumMaster?: User;
  private backlogItems: BacklogItem[] = [];
  private message!: IMessage;
  private state: ISprintState;

  constructor(private name: string, private startDate: Date, private endDate: Date) {
    this.state = new SprintCreatedState(this);
  }

  public getStartDate(): Date {
    return this.startDate;
  }

  public getEndDate(): Date {
    return this.endDate;
  }

  public getScrumMaster(): User | void {
    if (this.scrumMaster) {
      return this.scrumMaster;
    }
  }

  public addBacklogItem(backlogItem: BacklogItem) {
    this.backlogItems.push(backlogItem);
  }

  public removeBacklogItem(backlogItem: BacklogItem) {
    const index = this.backlogItems.indexOf(backlogItem);
    if (index !== -1) {
      this.backlogItems.splice(index, 1);
    }
  }

  public getBacklogItems(): BacklogItem[] {
    return this.backlogItems;
  }

  public setState(state: ISprintState): void {
    this.state = state;
  }

  public getState(): ISprintState {
    return this.state;
  }

  public updateSprint(
    name?: string,
    startDate?: Date,
    endDate?: Date,
    user?: User
  ): void {
    if (this.state instanceof SprintActiveState) {
      console.log("Cannot update Sprint because it has already started");
    } else {
      if (name) this.name = name;
      if (startDate) this.startDate = startDate;
      if (endDate) this.endDate = endDate;
      if (user && user.role == Role.ScrumMaster) this.scrumMaster = user;
    }
  }

  public create(user: User): void {
      if (user.role == Role.ScrumMaster) {
        this.state.onCreate();
        this.message.message = `Sprint ${this.name} created`;
      }
  }

  public start(user: User): void {
    if (user.role == Role.ScrumMaster) {
      this.state.onStart();
      this.message.message = `Sprint ${this.name} started`;
    }
  }

  public finish(user: User): void {
    if (user.role == Role.ScrumMaster) {
      this.state.onFinish();
      this.message.message = `Sprint ${this.name} completed`;
    }
  }

  public review(user: User): void {
    if (user.role == Role.ScrumMaster) {
      this.state.onReview();
      this.message.message = `Sprint ${this.name} released`;
    }
  }

  public complete(user: User): void {
    if (user.role == Role.ScrumMaster) {
      this.state.onComplete();
      this.message.message = `Sprint ${this.name} completed`;
    }
  }

  public release(user: User): void {
    if (user.role == Role.ScrumMaster) {
      this.state.onClose();
      this.message.message = `Sprint ${this.name} released`;
    }
  }
}