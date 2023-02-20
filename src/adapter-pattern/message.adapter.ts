import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { Thread } from "../observer-pattern/models/thread.model";
import { IMessage } from "./interfaces/IMessage";
import { IMessagingAdapter } from "./interfaces/IMessagingAdapter";
import { IMessagingService } from "./interfaces/IMessagingService";

// Implementation of the MessagingAdapter that uses a MessagingService
export class MessagingServiceAdapter implements IMessagingAdapter, IObserver {
  private messagingService: IMessagingService;
  private message!: IMessage;

  constructor(messagingService: IMessagingService) {
    this.messagingService = messagingService;
  }
  // Send a notification to the appropriate service when a Thread is updated
  public update(subject: ISubject) {
    const thread = subject as Thread;
    const backlogItem = thread.getBacklogItem();
    const messages = thread.getMessages();

    this.message.content = `New Slack message in Thread for Backlog Item ${backlogItem.getId()}: ${
      messages[messages.length - 1]
    }`;

    // Send the notification using the NotificationService
    this.sendMessage(this.message);
  }

  public sendMessage(message: IMessage): void {
    this.messagingService.sendMessage(message);
  }
}
