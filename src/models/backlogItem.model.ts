import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { IBacklogItemState } from "../state-pattern/interface/IBacklogItemState";
import { BacklogDoneState } from "../state-pattern/states/backlog-states/done.state";
import { BacklogReadyForTestingState } from "../state-pattern/states/backlog-states/readyForTesting.state";
import { BacklogToDoState } from "../state-pattern/states/backlog-states/toDo.state";
import { Activity } from "./activity.model";
import { Thread } from "./thread.model";
import { Developer, LeadDeveloper } from "./users.model";

export class BacklogItem implements ISubject {
  public id: string;
  public name: string;
  public description: string;
  public notifyScrumMaster = false;
  private observers: IObserver[] = [];
  private state: IBacklogItemState;
  private developer?: Developer | LeadDeveloper
  private activities: Activity[] = [];
  private thread?: Thread;

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.state = new BacklogToDoState(this);
  }

  public setDeveloper(developer: Developer | LeadDeveloper) {
    if (!this.developer) {
      this.developer = developer;
    }
  }

  public removeDeveloper() {
    this.developer = undefined;
  }

  public getDeveloper(): Developer | LeadDeveloper | void {
    if (this.developer) {
      return this.developer;
    }
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

  public attachThread(thread: Thread) {
    if (!thread) {
      this.thread = thread;
    }
  }

  public removeThread() {
    this.thread = undefined;
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
      this.notifyScrumMaster = true;
    }
    this.notify("Backlog item moved from 'ready for testing/done' state to 'to do' state.");
    this.state.toDo();
  }

  public doing(): void {
    this.notify("");
    this.state.doing();
  }

  public readyForTesting(): void {
    this.notify("");
    this.state.readyForTesting();
  }

  public testing(): void {
    this.notify("");
    this.state.testing();
  }

  public tested(): void {
    this.notify("");
    this.state.tested();
  }

  public done(): void {
    this.notify("");
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

  public getId(): string {
    return this.id;
  }

  // public override log(): void {
  //   console.log(`Backlog item: ${this.name}`);
  //   this.children.forEach((child) => child.log());
  // }
}
