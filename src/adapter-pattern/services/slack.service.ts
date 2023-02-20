import { IMessage } from "../interface/IMessage";
import { IMessagingService } from "../interface/IMessagingService";

// Implementation of the MessagingService for slack
export class SlackService implements IMessagingService {
  public sendMessage(message: IMessage): void {
    console.log(
      `Sending Slack message to ${message.recipient}: ${message.content}`
    );
  }
}
