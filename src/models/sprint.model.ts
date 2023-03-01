// import { IMessage } from "../adapter-pattern/interfaces/IMessage";
import { ISprintState } from "../state-pattern/interface/ISprintState";
import { BacklogItem } from "./backlogItem.model";
import { User } from "./user/user.model";
import { SprintCreatedState } from "../state-pattern/states/sprint-states/created.state";
import { SprintActiveState } from "../state-pattern/states/sprint-states/active.state";
import { Role } from "./user/roles";
import { Pipeline } from "./pipeline.model";

export class Sprint {
  private backlogItems: BacklogItem[] = [];
  private state: ISprintState;
  // private message: IMessage = { address: "", message: "" };

  constructor(private name: string, private startDate: Date, private endDate: Date, private scrumMaster: User, private pipeline: Pipeline) {
    if (scrumMaster.role !== Role.ScrumMaster) {
      throw new Error("Invalid scrum master!");
    }
    this.state = new SprintCreatedState(this);
  }

  public getName(): string {
    return this.name;
  }

  public getStartDate(): Date {
    return this.startDate;
  }

  public getEndDate(): Date {
    return this.endDate;
  }

  public getScrumMaster(): User {
    return this.scrumMaster;
  }

  public addBacklogItem(backlogItem: BacklogItem) {
    this.backlogItems.push(backlogItem);
  }

  public getBacklogItems(): BacklogItem[] {
    return this.backlogItems;
  }

  public removeBacklogItem(backlogItem: BacklogItem) {
    const index = this.backlogItems.indexOf(backlogItem);
    if (index !== -1) {
      this.backlogItems.splice(index, 1);
    }
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
      throw new Error("Cannot update Sprint because it has already started!");
    }
    if (name) this.name = name;
    if (startDate) this.startDate = startDate;
    if (endDate) this.endDate = endDate;
    if (user && user.role == Role.ScrumMaster) this.scrumMaster = user;
  }

  public create(scrumMaster: User): void {
    if (scrumMaster.role !== Role.ScrumMaster) {
      throw new Error("Only the scrum master can perform this action!");
    }
    this.state.onCreate();
      // this.message.message = `Sprint ${this.name} created`;
  }

  public start(scrumMaster: User): void {
    if (scrumMaster.role !== Role.ScrumMaster) {
      throw new Error("Only the scrum master can perform this action!");
    }
    this.state.onStart();
    // this.message.message = `Sprint ${this.name} started`;
  }

  public finish(scrumMaster: User): void {
    if (scrumMaster.role !== Role.ScrumMaster) {
      throw new Error("Only the scrum master can perform this action!");
    }
    this.state.onFinish();
    // this.message.message = `Sprint ${this.name} completed`;
  }

  public review(scrumMaster: User): void {
    if (scrumMaster.role !== Role.ScrumMaster) {
      throw new Error("Only the scrum master can perform this action!");
    }
    this.state.onReview();
    // this.message.message = `Sprint ${this.name} released`;
  }

  public complete(scrumMaster: User): void {
    if (scrumMaster.role !== Role.ScrumMaster) {
      throw new Error("Only the scrum master can perform this action!");
    }
    this.state.onComplete();
    // this.message.message = `Sprint ${this.name} completed`;
  }

  public release(scrumMaster: User): void {
    if (scrumMaster.role !== Role.ScrumMaster) {
      throw new Error("Only the scrum master can perform this action!");
    }
    this.pipeline.execute();
    this.state.onClose();
    // this.message.message = `Sprint ${this.name} released`;
  }
}