import { IObserver } from "./interfaces/IObserver";
import { DiscordService } from "../adapter-pattern/services/discord.service";
import { EmailService } from "../adapter-pattern/services/email.service";
import { SlackService } from "../adapter-pattern/services/slack.service";
import { WhatsappService } from "../adapter-pattern/services/whatsapp.service";
import { IMessage } from "../adapter-pattern/interfaces/IMessage";
import { Notification } from "../models/notification.model";
import { NotificationType } from "../models/enumerations";
import { IEmail } from "../adapter-pattern/interfaces/IEmail";

export class NotificationObserver implements IObserver {
  update(data: any): void {
    const notificationData: Notification = data;

    const discordService = new DiscordService();
    const emailService = new EmailService();
    const slackService = new SlackService();
    const whatsappService = new WhatsappService();

    console.warn(notificationData);

    for (const notificationPreference of notificationData
      .getRecipient()
      .getNotificationPreferences()) {
      console.warn(notificationPreference);
      const message: IMessage = {
        address: notificationPreference.getAddress(),
        message: notificationData.getMessage(),
      };

      switch (notificationPreference.getNotifyType()) {
        case NotificationType.DISCORD:
          discordService.sendMessage(message);
          break;
        case NotificationType.EMAIL:
          const email: IEmail = {
            to: notificationData.getRecipient().getEmail(),
            from: notificationPreference.getAddress(),
            subject: notificationData.getSubject(),
            body: notificationData.getMessage()
          }
          emailService.sendEmail(email);
          break;
        case NotificationType.SLACK:
          slackService.sendMessage(message);
          break;
        case NotificationType.WHATSAPP:
          whatsappService.sendMessage(message);
          break;
        default:
          throw new Error(
            `No notification preference set for ${notificationData.getRecipient()}`
          );
      }
    }
  }
}
