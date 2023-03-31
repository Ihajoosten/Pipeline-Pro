import { User } from "./user.model";

export class ThreadMessage {
  private _message: string;
  private _createdBy: User;
  private _createdAt: Date;
  private _threadMessages?: Array<ThreadMessage>

  constructor(public message: string, public createdBy: User, public threadMessages: Array<ThreadMessage>) {
    this._message = message;
    this._createdBy = createdBy;
    this._createdAt = new Date(Date.now());
    this._threadMessages = threadMessages
  }

  public getMessage(): string {
    return this._message;
  }

  public getCreationInfo(): string {
    return `${this._createdBy} - ${this._createdAt}`;
  }

  public addThreadMessageToThreadMessage(message: ThreadMessage) {
    if (this._threadMessages) this._threadMessages.push(message)
  }

  public removeMessage(threadMessage: ThreadMessage) {
    if (this._threadMessages) {
      const index = this._threadMessages.indexOf(threadMessage);
      if (index !== -1) {
        this._threadMessages.splice(index, 1);
      }
    }
  }
  public getThreadMessages(): Array<ThreadMessage> {
    if (this._threadMessages) return this._threadMessages;
    return []
  }
}
