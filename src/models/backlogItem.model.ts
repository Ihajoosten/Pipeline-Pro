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
  public _name: string;
  public _description: string;
  public _storyPoints: number;
  private _createdBy: User;
  private _createdAt: Date;
  private _scrumMaster: User
  private _developer?: User;
  private _tester?: User;
  private _activities: Array<Activity> = [];
  private _thread?: Thread;
  private _state: IBacklogItemState;
  private _observers: Array<IObserver> = [];

  constructor(name: string, description: string, storyPoints: number, createdBy: User, scrumMaster: User) {
    this._name = name;
    this._description = description;
    this._storyPoints = storyPoints;
    this._createdBy = createdBy;
    this._createdAt = new Date(Date.now());
    if (scrumMaster.getRole() !== ScrumRole.SCRUM_MASTER) throw new Error("Invalid scrum master!");
    this._scrumMaster = scrumMaster;
    this._state = new BacklogToDoState(this);
  }

  public getCreationInfo(): string {
    return `${this._createdBy} - ${this._createdAt}`;
  }

  public getScrumMaster(): User {
    return this._scrumMaster;
  }

  public setDeveloper(developer: User) {
    if (!(developer.getRole() == ScrumRole.DEVELOPER || developer.getRole() == ScrumRole.LEAD_DEVELOPER)) throw new Error("Invalid developer!");
    this._developer = developer;
  }

  public getDeveloper(): User | undefined {
    return this._developer;
  }

  public removeDeveloper(): void {
    this._developer = undefined;
  }

  public setTester(tester: User) {
    if (tester.getRole() !== ScrumRole.TESTER) throw new Error ("Invalid tester!");
    this._tester = tester;
  }

  public getTester(): User | undefined {
    return this._tester;
  }

  public removeTester(): void {
    this._tester = undefined;
  }

  public addActivity(activity: Activity) {
    this._activities.push(activity);
  }

  public removeActivity(activity: Activity) {
    const index = this._activities.indexOf(activity);
    if (index !== -1) {
      this._activities.splice(index, 1);
    }
  }

  public getActivities(): Activity[] {
    return this._activities;
  }

  public addThread(thread: Thread) {
    if (this._thread) throw new Error("Thread already exists!");
    if (this._state instanceof BacklogDoneState) throw new Error('Cannot add new thread, the item is already finished!');
    this._thread = thread;
  }

  public getThread(): Thread | void {
    if (this._thread) {
      return this._thread;
    }
  }

  public removeThread() {
    this._thread = undefined;
  }

  public getState(): IBacklogItemState {
    return this._state;
  }

  public setState(state: IBacklogItemState): void {
    this._state = state;
  }

  public toDo(): void {
    if (
      this._state instanceof BacklogReadyForTestingState ||
      this._state instanceof BacklogDoneState
    ) {
      const notificationMessage = `Backlog item: ${this._name} moved from the 'ready for testing/done' stage to the 'to do' stage!`;
      const notification = new Notification(
        this._scrumMaster,
        notificationMessage
      );
      this.notify(notification);
    }
    this._state.toDo();
  }

  public doing(): void {
    this._state.doing();
  }

  public readyForTesting(): void {
    this._state.readyForTesting();
    if (this._tester) {
      const notificationMessage = `Backlog item: ${this._name} moved to the 'ready for testing' stage!`;
      const notification = new Notification(this._tester, notificationMessage);
      this.notify(notification);
    }
  }

  public testing(): void {
    this._state.testing();
  }

  public tested(): void {
    this._state.tested();
  }

  public done(): void {
    // Check if all activities are done
    let allDone: boolean = true
    this._activities.forEach(act => {
      if (!act.isDone) allDone = false;
    });
    if (!allDone) { throw new Error('Not all activites are done for this backlog item') }
    this._state.done();
  }

  public subscribe(observer: IObserver) {
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
