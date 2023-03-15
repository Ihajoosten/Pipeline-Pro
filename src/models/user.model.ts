import { NotificationType, ScrumRole } from "./enumerations";

export class User {
  constructor(
    public name: string,
    public email: string,
    public role: ScrumRole,
    private notificationPreference: NotificationPreference[] = []
  ) {}

  public addNotificationPreference(
    notificationType: NotificationType,
    address: string
  ) {
    this.notificationPreference.push(
      new NotificationPreference(notificationType, address)
    );
  }

  public removeNotificationPreference(
    notificationPreference: NotificationPreference
  ) {
    const index = this.notificationPreference.indexOf(notificationPreference);
    if (index !== -1) {
      this.notificationPreference.splice(index, 1);
    }
  }

  public getNotificationPreferences(): NotificationPreference[] {
    return this.notificationPreference;
  }
}

export class NotificationPreference {
  constructor(
    public notificationType: NotificationType,
    public address: string
  ) {}
}
