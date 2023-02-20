import { IBacklogItemState } from "../../state-pattern/interface/IBacklogItemState";
import { BacklogToDoState } from "../../state-pattern/states/backlog-states/toDo.state";
import { IObserver } from "../interfaces/IObserver";
import { ISubject } from "../interfaces/ISubject";
import { Sprint } from "./sprint.model";

export class BacklogItem implements ISubject {
  public id: string;
  public name: string;
  public description: string;
  private developer?: string;
  private activities: Array<string>;
  private linkedSprint?: Sprint;
  private observers: Array<IObserver>;
  private state: IBacklogItemState;

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.activities = new Array<string>();
    this.observers = new Array<IObserver>();
    this.state = new BacklogToDoState(this);
  }

  public getState(): IBacklogItemState {
    return this.state;
  }

  public setState(state: IBacklogItemState) {
    this.state = state;
  }

  public toDo(): void {
    this.state.toDo();
  }

  public doing(): void {
    this.state.doing();
  }

  public readyForTesting(): void {
    this.state.readyForTesting();
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

  // Attach an observer to the list of observers
  subscribe(observer: IObserver) {
    this.observers.push(observer);
  }

  // Detach an observer from the list of observers
  unsubscribe(observer: IObserver) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  // Notify all observers of a change in the Thread
  notify() {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  getId(): string {
    return this.id;
  }

  linkDeveloper(developer: string) {
    if (this.developer) {
      throw new Error("Backlog item is already assigned to a developer");
    }
    this.developer = developer;
  }

  unlinkDeveloper() {
    this.developer = undefined;
  }

  addActivity(activity: string) {
    this.activities.push(activity);
  }

  removeActivity(activity: string) {
    const index = this.activities.indexOf(activity);
    if (index !== -1) {
      this.activities.splice(index, 1);
    }
  }

  isDone() {
    return this.activities.length === 0;
  }

  linkSprint(sprint: Sprint) {
    if (this.linkedSprint) {
      throw new Error("Backlog item is already linked to a sprint");
    }
    this.linkedSprint = sprint;
    sprint.addBacklogItem(this);
  }

  unlinkSprint() {
    if (this.linkedSprint) {
      this.linkedSprint.removeBacklogItem(this);
      this.linkedSprint = undefined;
    }
  }
}
