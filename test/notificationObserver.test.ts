import { DiscordService } from "../src/adapter-pattern/services/discord.service";
import { EmailService } from "../src/adapter-pattern/services/email.service";
import { SlackService } from "../src/adapter-pattern/services/slack.service";
import { WhatsappService } from "../src/adapter-pattern/services/whatsapp.service";
import { UserFactory } from "../src/factory-pattern/user-factory";
import { NotificationType, ScrumRole } from "../src/models/enumerations";
import {
  Notification,
  NotificationPreference,
} from "../src/models/notification.model";
import { User } from "../src/models/user.model";
import { NotificationObserver } from "../src/observer-pattern/notificationObserver";

// Mock service classes
class MockDiscordService {
  sendMessage(): void {}
}

class MockEmailService {
  sendMessage(): void {}
}

class MockSlackService {
  sendMessage(): void {}
}

class MockWhatsappService {
  sendMessage(): void {}
}

describe("NotificationObserver", () => {
  let observer: NotificationObserver;
  let notificationData: Notification;
  let developer: User;
  let fakeDeveloper: User;
  let fakeData: Notification;

  beforeEach(() => {
    // Reset the notification data and service mocks before each test
    developer = new UserFactory().createUser(
      "Luc",
      "Joosten",
      "lhajoost@avans.nl",
      "0645791584",
      [
        new NotificationPreference(
          NotificationType.WHATSAPP,
          "lhajoosten@avans.nl"
        ),
        new NotificationPreference(
          NotificationType.SLACK,
          "lhajoosten@avans.nl"
        ),
        new NotificationPreference(
          NotificationType.DISCORD,
          "lhajoosten@avans.nl"
        ),
        new NotificationPreference(
          NotificationType.EMAIL,
          "lhajoosten@avans.nl"
        ),
      ],
      ScrumRole.DEVELOPER
    );
    fakeDeveloper = new UserFactory().createUser(
      "Luc",
      "Joosten",
      "lhajoost@avans.nl",
      "0645791584",
      [
        new NotificationPreference(
          NotificationType.TEST,
          "lhajoosten@avans.nl"
        ),
      ],
      ScrumRole.DEVELOPER
    );
    notificationData = new Notification(developer, "Test notification message");
    fakeData = new Notification(fakeDeveloper, "Testing Fake data");
  });

  it("update method should send notifications to all notification preferences", () => {
    // Arrange
    const notification = new Notification(developer, "Test");
    const observer = new NotificationObserver();
    const discordServiceSpy = jest.spyOn(
      DiscordService.prototype,
      "sendMessage"
    );
    const emailServiceSpy = jest.spyOn(EmailService.prototype, "sendMessage");
    const slackServiceSpy = jest.spyOn(SlackService.prototype, "sendMessage");
    const whatsappServiceSpy = jest.spyOn(
      WhatsappService.prototype,
      "sendMessage"
    );

    // Act
    observer.update(notification);

    // Assert
    expect(discordServiceSpy).toHaveBeenCalled();
    expect(emailServiceSpy).toHaveBeenCalled();
    expect(slackServiceSpy).toHaveBeenCalled();
    expect(whatsappServiceSpy).toHaveBeenCalled();

    // Clean up
    discordServiceSpy.mockRestore();
    emailServiceSpy.mockRestore();
    slackServiceSpy.mockRestore();
    whatsappServiceSpy.mockRestore();
  });

  it("should throw an error when recipient has no notification preferences", () => {
    const recipient = notificationData.getRecipient();

    observer = new NotificationObserver();

    expect(() => observer.update(fakeData)).toThrowError(
      `No notification preference set for ${recipient}`
    );
  });
});
