import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { ThreadMessage } from "./threadMessage";
import { Notification } from "./notification.model";
import { User } from "./user.model";

export class Thread implements ISubject {
  private messages: ThreadMessage[] = [];
  private observers: IObserver[] = [];

  constructor(public title: string, private owner: User) { }

  public addMessage(threadMessage: ThreadMessage) {
    this.messages.push(threadMessage);
    const notificationMessage = `${threadMessage.sender} responded to your thread with: ${threadMessage.content}`;
    const notification = new Notification(this.owner, notificationMessage);
    this.notify(notification);
  }

  public removeMessage(threadMessage: ThreadMessage) {
    const index = this.messages.indexOf(threadMessage);
    if (index !== -1) {
      this.messages.splice(index, 1);
    }
  }

  public getMessages(): ThreadMessage[] {
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

  public notify(notification: Notification) {
    for (const observer of this.observers) {
      observer.update(notification);
    }
  }
}
