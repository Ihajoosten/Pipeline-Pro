import { User } from "./user.model";

export class ThreadMessage {
  private _message: string;
  private _createdBy: User;
  private _createdAt: Date;

  constructor(public message: string, public createdBy: User) {
    this._message = message;
    this._createdBy = createdBy;
    this._createdAt = new Date(Date.now());
  }

  public getMessage(): string {
    return this._message;
  }

  public getCreationInfo(): string {
    return `${this._createdBy} - ${this._createdAt}`;
  }
}
