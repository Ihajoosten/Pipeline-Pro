import { IMessage } from "../../adapter-pattern/interfaces/IMessage";
import { MessagingServiceAdapter } from "../../adapter-pattern/message.adapter";
import { ISprintState } from "../../state-pattern/interface/ISprintState";
import { SprintCreatedState } from "../../state-pattern/states/sprint-states/created.state";
import { IObserver } from "../interfaces/IObserver";
import { BacklogItem } from "./backlogItem.model";

export class Sprint {
  public name: string;
  public startDate: Date;
  public endDate: Date;
  public backlogItems: Array<BacklogItem>;
  public activities: Array<string>;
  public currentPhase: string;
  private messageService!: MessagingServiceAdapter;
  private message!: IMessage;
  private observers: Array<IObserver>;
  private state: ISprintState;

  constructor(name: string, startDate: Date, endDate: Date) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.currentPhase = "created";
    this.backlogItems = new Array<BacklogItem>();
    this.activities = new Array<string>();
    this.observers = new Array<IObserver>();
    this.state = new SprintCreatedState(this);
  }

  public setState(state: ISprintState): void {
    this.state = state;
  }

  public getState(): ISprintState {
    return this.state;
  }

  public create(): void {
    this.state.create();
  }

  public start(): void {
    this.state.start();
  }

  public complete(): void {
    this.state.complete();
  }

  public release(): void {
    this.state.release();
  }

  public fail(): void {
    this.state.fail();
  }

  // Attach an observer to the list of observers
  public subscribe(observer: IObserver) {
    this.observers.push(observer);
  }

  // Detach an observer from the list of observers
  public unsubscribe(observer: IObserver) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  // Notify all observers of a change in the Thread
  public notify() {
    for (const observer of this.observers) {
      observer.update(this);
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

  public addActivity(activity: string) {
    this.activities.push(activity);
  }

  public startSprint() {
    this.currentPhase = "active";
    this.message.content = `Sprint ${this.name} started`;
    this.notifyObservers(this.message);
  }

  public completeSprint() {
    this.currentPhase = "active";
    this.message.content = `Sprint ${this.name} completed`;
    this.notifyObservers(this.message);
  }

  public notifyObservers(message: IMessage) {
    this.messageService.sendMessage(message);
  }
}
