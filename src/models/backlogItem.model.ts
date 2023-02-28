import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { IBacklogItemState } from "../state-pattern/interface/IBacklogItemState";
import { BacklogDoneState } from "../state-pattern/states/backlog-states/done.state";
import { BacklogReadyForTestingState } from "../state-pattern/states/backlog-states/readyForTesting.state";
import { BacklogToDoState } from "../state-pattern/states/backlog-states/toDo.state";
import { Activity } from "./activity.model";
import { Thread } from "./thread.model";
import { User } from "./user/abstract-user.model";
import { Role } from "./user/roles";

export class BacklogItem implements ISubject, IObserver {
  public notifyScrumMaster = false;
  private observers: Array<IObserver> = new Array<IObserver>();
  private state: IBacklogItemState;
  private developer?: User;
  private activities: Array<Activity> = new Array<Activity>();
  private thread?: Thread;

  constructor(public id: string, public name: string, public description: string) {
    this.state = new BacklogToDoState(this);
  }

  public setDeveloper(user: User) {
    if (!this.developer && user.getRole() == Role.Developer || Role.LeadDeveloper) {
      this.developer = user;
    }
  }

  public removeDeveloper() {
    this.developer = undefined;
  }

  public getDeveloper(): User | undefined {
    return this.developer;
  }

  public addActivity(activity: Activity) {
    this.activities.push(activity);
  }

  public removeActivity(activity: Activity) {
    const index = this.activities.indexOf(activity);
    if (index !== -1) {
      this.activities.splice(index, 1);
    }
  }

  public getActivities(): Activity[] {
    return this.activities;
  }

  public addThread(thread: Thread) {
    if (!this.thread) {
      this.thread = thread;
      thread.subscribe(this);
    }
  }

  public removeThread() {
    if (this.thread) {
      this.thread.unsubscribe(this);
      this.thread = undefined;
    }
  }

  public getThread(): Thread | void {
    if (this.thread) {
      return this.thread;
    }
  }

  public getState(): IBacklogItemState {
    return this.state;
  }

  public setState(state: IBacklogItemState): void {
    this.state = state;
  }

  public toDo(): void {
    if (this.state instanceof BacklogReadyForTestingState || BacklogDoneState) {
      this.state.toDo();
      this.notify(
        `Backlog item: ${this.name} moved from the 'ready for testing/done' to the 'to do' stage!`
      );
    }
    this.state.toDo();
  }

  public doing(): void {
    this.state.doing();
  }

  public readyForTesting(): void {
    this.state.readyForTesting();
    this.notify(
      `Backlog item: ${this.name} moved to the 'ready for testing' stage!`
    );
  }

  public testing(): void {
    this.state.testing();
  }

  public tested(): void {
    this.state.tested();
  }

  public done(): void {
    this.state.done();
  }

  public subscribe(observer: IObserver) {
    this.observers.push(observer);
  }

  public unsubscribe(observer: IObserver) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  public notify(message: string) {
    for (const observer of this.observers) {
      observer.update({ message, notifyScrumMaster: this.notifyScrumMaster });
    }
  }

  public update(thread: Thread): void {
    const messages = thread.getMessages();
    const lastMessage = messages[messages.length - 1]; // -1 of niet?
    this.notify(
      `A new message was added to ${thread.title}: ${lastMessage}`
    );
  }
}
