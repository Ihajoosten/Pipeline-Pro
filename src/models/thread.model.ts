import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { ThreadMessage } from "./threadMessage";
import { Notification } from "./notification.model";
import { User } from "./user.model";

export class Thread implements ISubject {
  private _title: string;
  private _createdBy: User;
  private _createdAt: Date;
  private _messages: Array<ThreadMessage> = [];
  private _observers: Array<IObserver> = [];

  constructor(title: string, message: string, createdBy: User) {
    this._title = title;
    this._messages.push(new ThreadMessage(message, createdBy, []));
    this._createdBy = createdBy;
    this._createdAt = new Date(Date.now());
  }

  public getTitle(): string {
    return this._title;
  }

  public getCreationInfo(): string {
    return `${this._createdBy} - ${this._createdAt}`;
  }

  public addMessage(threadMessage: ThreadMessage) {
    this._messages.push(threadMessage);
    const notificationMessage = `${threadMessage.createdBy.getFirstName() +
      threadMessage.createdBy.getLastName()
      } responded to your thread with: ${threadMessage.getMessage()}`;
    const notification = new Notification(this._createdBy, notificationMessage, 'Thread Reaction');
    this.notify(notification);
  }

  public removeMessage(threadMessage: ThreadMessage) {
    const index = this._messages.indexOf(threadMessage);
    if (index !== -1) {
      this._messages.splice(index, 1);
    }
  }

  public getMessages(): ThreadMessage[] {
    return this._messages;
  }

  public subscribe(observer: IObserver) {
    this._observers.push(observer);
  }

  public unsubscribe(observer: IObserver) {
    const index = this._observers.indexOf(observer);
    if (index !== -1) {
      this._observers.splice(index, 1);
    }
  }

  public notify(notification: Notification) {
    for (const observer of this._observers) {
      observer.update(notification);
    }
  }
}
