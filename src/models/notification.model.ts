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
  constructor(notificationType: NotificationType, address: string) { }
}