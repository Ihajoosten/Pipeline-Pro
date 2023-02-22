import { IMessage } from "../adapter-pattern/interfaces/IMessage";
import { MessagingServiceAdapter } from "../adapter-pattern/message.adapter";
import { ISprintState } from "../state-pattern/interface/ISprintState";
import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { BacklogItem } from "./backlogItem.model";
import { Composite } from "../composite-pattern/models/composite.model";
import { ScrumMaster } from "./users.model";
import { SprintActiveState } from "../state-pattern/states/sprint-states/active.state";
import { User } from "./abstract-user.model";

export class Sprint extends Composite implements ISubject {
  private name: string;
  private startDate: Date;
  private endDate: Date;
  private messageService!: MessagingServiceAdapter;
  private message!: IMessage;
  private observers: Array<IObserver>;
  private state: ISprintState;

  constructor(name: string, startDate: Date, endDate: Date) {
    super();
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.observers = new Array<IObserver>();
    this.state = new SprintActiveState(this);
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
      this.notifyObservers(this.message);
    }
  }

  public start(user: User): void {
    if (user instanceof ScrumMaster) {
      this.state.onStart();
      this.message.content = `Sprint ${this.name} started`;
      this.notifyObservers(this.message);
    }
  }

  public finish(user: User): void {
    if (user instanceof ScrumMaster) {
      this.state.onFinish();
      this.message.content = `Sprint ${this.name} completed`;
      this.notifyObservers(this.message);
    }
  }

  public review(user: User): void {
    if (user instanceof ScrumMaster) {
      this.state.onReview();
      this.message.content = `Sprint ${this.name} released`;
      this.notifyObservers(this.message);
    }
  }

  public complete(user: User): void {
    if (user instanceof ScrumMaster) {
      this.state.onComplete();
      this.message.content = `Sprint ${this.name} completed`;
      this.notifyObservers(this.message);
    }
  }

  public release(user: User): void {
    if (user instanceof ScrumMaster) {
      this.state.onClose();
      this.message.content = `Sprint ${this.name} released`;
      this.notifyObservers(this.message);
    }
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

  public notifyObservers(message: IMessage) {
    this.messageService.sendMessage(message);
  }
}
