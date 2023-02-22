import { IMessage } from "../adapter-pattern/interfaces/IMessage";
import { MessagingServiceAdapter } from "../adapter-pattern/message.adapter";
import { ISprintState } from "../state-pattern/interface/ISprintState";
import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { BacklogItem } from "./backlogItem.model";
import { ScrumMaster } from "./users.model";
import { SprintActiveState } from "../state-pattern/states/sprint-states/active.state";
import { User } from "./abstract-user.model";

export class Sprint implements IObserver {
  private name: string;
  private startDate: Date;
  private endDate: Date;
  private messageService!: MessagingServiceAdapter;
  private message!: IMessage;
  private state: ISprintState;
  private scrumMaster?: ScrumMaster;
  private backlogItems: BacklogItem[] = [];

  constructor(name: string, startDate: Date, endDate: Date) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.state = new SprintActiveState(this);
  }

  public setScrumMaster(scrumMaster: ScrumMaster) {
    if (!this.scrumMaster) {
      this.scrumMaster = scrumMaster;
    }
  }

  public removeScrumMaster() {
    this.scrumMaster = undefined;
  }

  public getScrumMaster(): ScrumMaster | void {
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

  public updateSprint(name: string, endDate: Date, startDate: Date): void {
    if (this.state instanceof SprintActiveState) {
      console.log("Cannot update Sprint because it has already started");
    }
    this.name = name;
    this.endDate = endDate;
    this.startDate = startDate;
  }

  public create(user: User): void {
    if (user instanceof ScrumMaster) {
      this.state.onCreate();
      this.message.content = `Sprint ${this.name} created`;
    }
  }

  public start(user: User): void {
    if (user instanceof ScrumMaster) {
      this.state.onStart();
      this.message.content = `Sprint ${this.name} started`;
    }
  }

  public finish(user: User): void {
    if (user instanceof ScrumMaster) {
      this.state.onFinish();
      this.message.content = `Sprint ${this.name} completed`;
    }
  }

  public review(user: User): void {
    if (user instanceof ScrumMaster) {
      this.state.onReview();
      this.message.content = `Sprint ${this.name} released`;
    }
  }

  public complete(user: User): void {
    if (user instanceof ScrumMaster) {
      this.state.onComplete();
      this.message.content = `Sprint ${this.name} completed`;
    }
  }

  public release(user: User): void {
    if (user instanceof ScrumMaster) {
      this.state.onClose();
      this.message.content = `Sprint ${this.name} released`;
    }
  }

  update(message: string): void {
      this.messageService.sendMessage({
        content: message
      })
  }

  // public log(): void {
  //   console.log(`Sprint: ${this.name}`);
  //   this.children.forEach((child) => child.log());
  // }
}
