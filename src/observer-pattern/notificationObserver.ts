import { IObserver } from "./interfaces/IObserver"
import { DiscordService } from "../adapter-pattern/services/discord.service";
import { EmailService } from "../adapter-pattern/services/email.service";
import { SlackService } from "../adapter-pattern/services/slack.service";
import { WhatsappService } from "../adapter-pattern/services/whatsapp.service";
import { IMessage } from "../adapter-pattern/interfaces/IMessage";
import { NotificationType } from "../models/user/notificationPreference";
import { Notification } from "../models/notification.model";

export class NotificationObserver implements IObserver {
    private sentNotifications: IMessage[] = []; // Wordt gebruikt voor testen

    update(data: any): void {
        const notificationData: Notification = data;

        const discordService = new DiscordService();
        const emailService = new EmailService();
        const slackService = new SlackService();
        const whatsappService = new WhatsappService();

        for (const notificationPreference of notificationData.getRecipient().getNotificationPreferences()) {
          const message: IMessage = { address: notificationPreference.address, message: notificationData.getMessage() };

          switch (notificationPreference.notificationType) {
            case NotificationType.Discord:
              discordService.sendMessage(message);
              this.sentNotifications.push(message);
              break;
            case NotificationType.Email:
              emailService.sendMessage(message);
              this.sentNotifications.push(message);
              break;
            case NotificationType.Slack:
              slackService.sendMessage(message);
              this.sentNotifications.push(message);
              break;
            case NotificationType.Whatsapp:
              whatsappService.sendMessage(message);
              this.sentNotifications.push(message);
              break;
            // In geval van 0 preferences, error throwen of niets doen?
          }

        }
    }
}