import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { BacklogItem } from "./backlogItem.model";
import { Message } from "./message.model";

export class Thread implements ISubject {
  private backlogItem: BacklogItem;
  private title: string;
  private messages: Message[] = [];
  private observers: Array<IObserver>;

  constructor(backlogItem: BacklogItem, title: string) {
    this.backlogItem = backlogItem;
    this.observers = new Array<IObserver>();
    this.title = title;
  }

  public getTitle(): string {
    return this.title;
  }

  public addMessage(message: Message) {
    this.messages.push(message);
  }

  public removeMessage(message: Message) {
    const index = this.messages.indexOf(message);
    if (index !== -1) {
      this.messages.splice(index, 1);
    }
  }

  public getMessages(): Message[] {
    return this.messages;
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

  // Get the BacklogItem associated with the Thread
  public getBacklogItem() {
    return this.backlogItem;
  }

  // public log(): void {
  //   console.log(`Thread: ${this.title}`);
  //   this.children.forEach((child) => child.log());
  // }

}
