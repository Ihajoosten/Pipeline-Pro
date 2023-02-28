import { Observer } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { IBacklogItemState } from "../state-pattern/interface/IBacklogItemState";
import { BacklogDoneState } from "../state-pattern/states/backlog-states/done.state";
import { BacklogReadyForTestingState } from "../state-pattern/states/backlog-states/readyForTesting.state";
import { BacklogToDoState } from "../state-pattern/states/backlog-states/toDo.state";
import { Activity } from "./activity.model";
import { Thread } from "./thread.model";
import { User } from "./user/user.model";
import { Role } from "./user/roles";

export class BacklogItem implements ISubject {
  public notifyScrumMaster = false;
  private observers: Observer[] = [];
  private state: IBacklogItemState;
  private developer?: User;
  private tester?: User;
  private activities: Activity[] = [];
  private thread?: Thread;

  constructor(public id: string, public name: string, public description: string, private scrumMaster: User) {
    this.state = new BacklogToDoState(this);
  }

  public setDeveloper(user: User) {
    if (!this.developer && user.role == Role.Developer || Role.LeadDeveloper) {
      this.developer = user;
    }
  }

  public removeDeveloper() {
    this.developer = undefined;
  }

  public getDeveloper(): User | undefined {
    return this.developer;
  }

  public setTester(user: User) {
    if (!this.tester && user.role == Role.Developer || Role.LeadDeveloper) {
      this.tester = user;
    }
  }

  public removeTester() {
    this.tester = undefined;
  }

  public getTester(): User | undefined {
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
    }
  }

  public removeThread() {
    if (this.thread) {
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
      const observer = new Observer(this.scrumMaster, `Backlog item: ${this.name} moved from the 'ready for testing/done' to the 'to do' stage!`);
      this.observers.push(observer);
      this.notify();
    }
    this.state.toDo();
  }

  public doing(): void {
    this.state.doing();
  }

  public readyForTesting(): void {
    this.state.readyForTesting();
    if (this.tester) {
      const observer = new Observer(this.tester, `Backlog item: ${this.name} moved to the 'ready for testing' stage!`)
      this.observers.push(observer);
      this.notify();
    }
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

  public notify() {
    for (const observer of this.observers) {
      observer.sendMessage();
      this.observers.splice(0); // IS DIT NOODZAKELIJK?
    }
  }
}
