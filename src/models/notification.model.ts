import { NotificationType } from "./enumerations";
import { User } from "./user.model";

export class Notification {
  constructor(private recipient: User, private message: string) { }

  public getRecipient(): User {
    return this.recipient;
  }

  public getMessage(): string {
    return this.message;
  }
}

export class NotificationPreference {
  private _type: NotificationType;
  private _address: string

  constructor(notificationType: NotificationType, address: string) {
    this._type = notificationType;
    this._address = address;
  }

  public getNotifyType(): NotificationType { return this._type; }
  public getAddress(): string { return this._address; }
  public equals(other: NotificationPreference): boolean {
    return (
      this._type === other._type &&
      this._address === other._address
    );
  }
}