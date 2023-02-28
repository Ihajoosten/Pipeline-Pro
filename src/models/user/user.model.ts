import { NotificationPreference, NotificationType } from "./notificationPreference";
import { Role } from "./roles";

export class User {
  constructor(public name: string, public email: string, public role: Role, private notificationPreference: NotificationPreference[]) { }

    public addNotificationPreference(notificationType: NotificationType, address: string) {
      this.notificationPreference.push(new NotificationPreference(notificationType, address));
    }

    public removeNotificationPreference(notificationPreference: NotificationPreference) {
      const index = this.notificationPreference.indexOf(notificationPreference);
      if (index !== -1) {
        this.notificationPreference.splice(index, 1);
      }
    }

    public getNotificationPreferences(): NotificationPreference[] {
      return this.notificationPreference;
    }
  }
