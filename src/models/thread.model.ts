import { Observer } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { Message } from "./message.model";
import { User } from "./user/user.model";

export class Thread implements ISubject {
  private messages: Message[] = [];
  private observers: Observer[] = [];

  constructor(public title: string, private owner: User) { }

  public addMessage(message: Message, user: User) {
    const observer = new Observer(this.owner, `${user.name} responded to your thread with: ${message}`);
    this.observers.push(observer);
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

  // public subscribe(observer: Observer) {
  //   this.observers.push(observer);
  // }

  // public unsubscribe(observer: Observer) {
  //   const index = this.observers.indexOf(observer);
  //   if (index !== -1) {
  //     this.observers.splice(index, 1);
  //   }
  // }

  public notify() {
    for (const observer of this.observers) {
      observer.sendMessage();
      this.observers.splice(0); // IS DIT NOODZAKELIJK?
    }
  }
}
