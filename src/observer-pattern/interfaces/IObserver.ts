import { IMessage } from "../../adapter-pattern/interfaces/IMessage";
import { DiscordService } from "../../adapter-pattern/services/discord.service";
import { EmailService } from "../../adapter-pattern/services/email.service";
import { SlackService } from "../../adapter-pattern/services/slack.service";
import { WhatsappService } from "../../adapter-pattern/services/whatsapp.service";
import { User } from "../../models/user/user.model";
import { NotificationType } from "../../models/user/notificationPreference";

export class Observer {
  private sentNotifications: string[] = []; // Dit later gebruiken voor testen
  constructor(private receiver: User, private message: string) {}

  public sendMessage(): void {
    const discordService = new DiscordService();
    const emailService = new EmailService();
    const slackService = new SlackService();
    const whatsappService = new WhatsappService();

    for (const notificationPreference of this.receiver.getNotificationPreferences()) {
      const message: IMessage = { address: notificationPreference.address, message: this.message };
      switch (notificationPreference.notificationType) {
        case NotificationType.Discord:
          discordService.sendMessage(message);
          break;
        case NotificationType.Email:
          emailService.sendMessage(message);
          break;
        case NotificationType.Slack:
          slackService.sendMessage(message);
          break;
        case NotificationType.Whatsapp:
          whatsappService.sendMessage(message);
          break;
      }
    }
  }
}