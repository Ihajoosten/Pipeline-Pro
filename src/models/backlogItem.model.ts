import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { IBacklogItemState } from "../state-pattern/interface/IBacklogItemState";
import { BacklogDoneState } from "../state-pattern/states/backlog-states/done.state";
import { BacklogReadyForTestingState } from "../state-pattern/states/backlog-states/readyForTesting.state";
import { BacklogToDoState } from "../state-pattern/states/backlog-states/toDo.state";
import { Activity } from "./activity.model";
import { Thread } from "./thread.model";
import { User } from "./user.model";
import { Notification } from "./notification.model";
import { ScrumRole } from "./enumerations";

export class BacklogItem implements ISubject {
  private observers: IObserver[] = [];
  private state: IBacklogItemState;
  private developer?: User;
  private tester?: User;
  private activities: Array<Activity> = [];
  private thread?: Thread;

  constructor(
    public id: string,
    public name: string,
    public description: string,
    private scrumMaster: User
  ) {
    this.state = new BacklogToDoState(this);
  }

  public getScrumMaster(): User {
    return this.scrumMaster;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDeveloper(user: User) {
    if (
      user.getRole() == ScrumRole.DEVELOPER ||
      user.getRole() == ScrumRole.LEAD_DEVELOPER
    ) {
      this.developer = user;
    }
  }

  public getDeveloper(): User | undefined {
    return this.developer;
  }

  public removeDeveloper(): void {
    this.developer = undefined;
  }

  public setTester(user: User) {
    if (user.getRole() == ScrumRole.TESTER) {
      this.tester = user;
    } else {
      throw new Error("Backlog item is not ready for testing");
    }
  }

  public getTester(): User | undefined {
    return this.tester;
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
    if (this.thread) {
      throw new Error("Thread already exists!");
    }

    if (this.state instanceof BacklogDoneState) throw new Error('Cannot add new messages, the item is already finished');
    this.thread = thread;
  }

  public getThread(): Thread | void {
    if (this.thread) {
      return this.thread;
    }
  }

  public removeThread() {
    this.thread = undefined;
  }

  public getState(): IBacklogItemState {
    return this.state;
  }

  public setState(state: IBacklogItemState): void {
    this.state = state;
  }

  public toDo(): void {
    if (
      this.state instanceof BacklogReadyForTestingState ||
      this.state instanceof BacklogDoneState
    ) {
      const notificationMessage = `Backlog item: ${this.name} moved from the 'ready for testing/done' stage to the 'to do' stage!`;
      const notification = new Notification(
        this.scrumMaster,
        notificationMessage
      );
      this.notify(notification);
    }
    this.state.toDo();
  }

  public doing(): void {
    this.state.doing();
  }

  public readyForTesting(): void {
    this.state.readyForTesting();
    if (this.tester) {
      const notificationMessage = `Backlog item: ${this.name} moved to the 'ready for testing' stage!`;
      const notification = new Notification(this.tester, notificationMessage);
      this.notify(notification);
    }
  }

  public testing(): void {
    this.state.testing();
  }

  public tested(): void {
    this.state.tested();
  }

  public done(): void {
    // Check if all activities are done
    let allDone: boolean = true
    this.activities.forEach(act => {
      if (!act.isDone) allDone = false;
    });
    if (!allDone) { throw new Error('Not all activites are done for this backlog item') }
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

  public notify(notification: Notification) {
    for (const observer of this.observers) {
      observer.update(notification);
    }
  }
}
