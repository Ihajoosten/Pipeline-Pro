import { IMessage } from "../adapter-pattern/interfaces/IMessage";
import { MessagingServiceAdapter } from "../adapter-pattern/message.adapter";
import { Composite } from "../composite-pattern/models/composite.model";
import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { IBacklogItemState } from "../state-pattern/interface/IBacklogItemState";
import { BacklogToDoState } from "../state-pattern/states/backlog-states/toDo.state";
import { Activity } from "./activity.model";
import { Thread } from "./thread.model";
import { Developer, LeadDeveloper } from "./users.model"; // Mag ik hier een referenties hebben?

export class BacklogItem extends Composite implements ISubject {
  public id: string;
  public name: string;
  public description: string;
  private observers: Array<IObserver>;
  private state: IBacklogItemState;
  private messageService!: MessagingServiceAdapter;
  private message!: IMessage;

  constructor(id: string, name: string, description: string) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.observers = new Array<IObserver>();
    this.state = new BacklogToDoState(this);
  }

  public override log(): void {
    console.log(`Backlog item: ${this.name}`);
    this.children.forEach((child) => child.log());
  }

  public override add(component: Composite): void {
    if (
      !(component instanceof Developer || LeadDeveloper || Activity || Thread)
    ) {
      return;
    }

    let containsDeveloper = false;
    this.children.forEach((child) => {
      if (child instanceof Developer || LeadDeveloper) {
        containsDeveloper = true;
      }
    });

    if (containsDeveloper && component instanceof Activity) {
      this.children.push(component);
    }
  }

  public getState(): IBacklogItemState {
    return this.state;
  }

  public setState(state: IBacklogItemState): void {
    this.state = state;
  }

  public toDo(): void {
    this.message.content = `Backlog Item: ${this.name} is back in To Do`;
    this.notify(this.message);
    this.state.toDo();
  }

  public doing(): void {
    this.message.content = `Backlog Item: ${this.name} is in progress`;
    this.notify(this.message);
    this.state.doing();
  }

  public readyForTesting(): void {
    this.message.content = `Backlog Item: ${this.name} ready for testing`;
    this.notify(this.message);
    this.state.readyForTesting();
  }

  public testing(): void {
    this.message.content = `Backlog Item: ${this.name} is testing`;
    this.notify(this.message);
    this.state.testing();
  }

  public tested(): void {
    this.message.content = `Backlog Item: ${this.name} is tested`;
    this.notify(this.message);
    this.state.tested();
  }

  public done(): void {
    this.message.content = `Backlog Item: ${this.name} is done`;
    this.notify(this.message);
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
  public notify(message: IMessage) {
    for (const observer of this.observers) {
      observer.update(this);
    }
    this.messageService.sendMessage(message);
  }

  getId(): string {
    return this.id;
  }
}
