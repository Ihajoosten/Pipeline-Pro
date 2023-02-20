import { IMessage } from "../interfaces/IMessage";
import { IMessagingService } from "../interfaces/IMessagingService";


// Implementation of the MessagingService for slack
export class SlackService implements IMessagingService {
  public sendMessage(message: IMessage): void {
    console.log(
      `Sending Slack message to ${message.recipient}: ${message.content}`
    );
  }
}
