import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { Message } from "./message.model";

export class Thread implements ISubject {
  private title: string;
  private messages: Message[] = [];
  private observers: Array<IObserver>;

  constructor(title: string) {
    this.observers = new Array<IObserver>();
    this.title = title;
  }

  public getTitle(): string {
    return this.title;
  }

  public addMessage(message: Message) {
    this.messages.push(message);
    this.notify();
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

  public subscribe(observer: IObserver) {
    this.observers.push(observer);
  }

  public unsubscribe(observer: IObserver) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  public notify() {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}
