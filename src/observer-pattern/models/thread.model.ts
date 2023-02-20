import { IObserver } from "../interfaces/IObserver";
import { ISubject } from "../interfaces/ISubject";
import { BacklogItem } from "./backlogItem.model";


// Implement the Subject interface in the Thread class
export class Thread implements ISubject {
  private backlogItem: BacklogItem;
  private messages: Array<string>;
  private observers: Array<IObserver>;

  constructor(backlogItem: BacklogItem) {
    this.backlogItem = backlogItem;
    this.messages = new Array<string>();
    this.observers = new Array<IObserver>();
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
