import { IMessage } from "../adapter-pattern/interfaces/IMessage";
import { MessagingServiceAdapter } from "../adapter-pattern/message.adapter";
import { ISprintState } from "../state-pattern/interface/ISprintState";
import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { BacklogItem } from "./backlogItem.model";
import { User } from "./user/abstract-user.model";
import { SprintCreatedState } from "../state-pattern/states/sprint-states/created.state";
import { SprintActiveState } from "../state-pattern/states/sprint-states/active.state";
import { Role } from "./user/roles";

export class Sprint implements IObserver {
  private scrumMaster?: User;
  private backlogItems: Array<BacklogItem> = new Array<BacklogItem>();
  private messageService!: MessagingServiceAdapter;
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
    backlogItem.subscribe(this);
    this.backlogItems.push(backlogItem);
  }

  public removeBacklogItem(backlogItem: BacklogItem) {
    const index = this.backlogItems.indexOf(backlogItem);
    if (index !== -1) {
      this.backlogItems.splice(index, 1);
      backlogItem.unsubscribe(this);
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
      if (user && user.getRole() == Role.ScrumMaster) this.scrumMaster = user;
    }
  }

  public create(user: User): void {
    if (user.getRole() == Role.ScrumMaster) {
      this.state.onCreate();
      this.message.content = `Sprint ${this.name} created`;
    }
  }

  public start(user: User): void {
    if (user.getRole() == Role.ScrumMaster) {
      this.state.onStart();
      this.message.content = `Sprint ${this.name} started`;
    }
  }

  public finish(user: User): void {
    if (user.getRole() == Role.ScrumMaster) {
      this.state.onFinish();
      this.message.content = `Sprint ${this.name} completed`;
    }
  }

  public review(user: User): void {
    if (user.getRole() == Role.ScrumMaster) {
      this.state.onReview();
      this.message.content = `Sprint ${this.name} released`;
    }
  }

  public complete(user: User): void {
    if (user.getRole() == Role.ScrumMaster) {
      this.state.onComplete();
      this.message.content = `Sprint ${this.name} completed`;
    }
  }

  public release(user: User): void {
    if (user.getRole() == Role.ScrumMaster) {
      this.state.onClose();
      this.message.content = `Sprint ${this.name} released`;
    }
  }

  update(message: string): void {
    this.messageService.sendMessage({
      content: message,
    });
  }
}
