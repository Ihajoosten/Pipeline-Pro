import { Composite } from "../composite-pattern/models/composite.model";
import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { BacklogItem } from "./backlogItem.model";
import { Message } from "./message.model";

// Implement the Subject interface in the Thread class
export class Thread extends Composite implements ISubject {
  private backlogItem: BacklogItem;
  private messages: Array<string>;
  private observers: Array<IObserver>;
  private title: string;

  constructor(backlogItem: BacklogItem, title: string) {
    super();
    this.backlogItem = backlogItem;
    this.messages = new Array<string>();
    this.observers = new Array<IObserver>();
    this.title = title;
  }

  public log(): void {
    console.log(`Thread: ${this.title}`);
    this.children.forEach((child) => child.log());
  }

  public override add(component: Composite): void {
    if (component instanceof Message) {
      this.children.push(component);
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

  // Add a message to the Thread
  public addMessage(message: string) {
    this.messages.push(message);
    this.notify();
  }

  // Get the BacklogItem associated with the Thread
  public getBacklogItem() {
    return this.backlogItem;
  }

  // Get all messages in the Thread
  public getMessages() {
    return this.messages;
  }
}
