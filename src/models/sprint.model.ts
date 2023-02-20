import { IMessage } from "../adapter-pattern/interfaces/IMessage";
import { MessagingServiceAdapter } from "../adapter-pattern/message.adapter";
import { ISprintState } from "../state-pattern/interface/ISprintState";
import { SprintCreatedState } from "../state-pattern/states/sprint-states/created.state";
import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { BacklogItem } from "./backlogItem.model";
import { Composite } from "../composite-pattern/models/composite.model";
import { ScrumMaster } from "./users.model";

export class Sprint extends Composite implements ISubject {
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
    super();
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.currentPhase = "created";
    this.backlogItems = new Array<BacklogItem>();
    this.activities = new Array<string>();
    this.observers = new Array<IObserver>();
    this.state = new SprintCreatedState(this);
  }

  public log(): void {
    console.log(`Sprint: ${this.name}`);
    this.children.forEach((child) => child.log());
  }

  public override add(component: Composite): void {
    if (!(component instanceof BacklogItem || ScrumMaster)) {
      return;
    }

    let containsScrumMaster = false;
    this.children.forEach((child) => {
      if (child instanceof ScrumMaster) {
        containsScrumMaster = true;
      }
    });

    if (containsScrumMaster && component instanceof BacklogItem) {
      this.children.push(component);
    }
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
