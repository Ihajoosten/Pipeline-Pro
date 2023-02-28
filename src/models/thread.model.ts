import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { Message } from "./message.model";

export class Thread implements ISubject {
  private messages: Message[] = [];
  private observers: IObserver[] = [];

  constructor(public title: string) { }

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
