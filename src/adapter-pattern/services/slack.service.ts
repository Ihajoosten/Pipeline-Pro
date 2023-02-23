import { IMessage } from "../interfaces/IMessage";
import { IMessagingService } from "../interfaces/IMessagingService";

// Implementation of the MessagingService for slack
export class SlackService implements IMessagingService {
  public constructor(public name: string) {}

  public sendMessage(message: IMessage): void {
    if (message == null) throw new Error("Invalid message.");
    console.log(
      `Sending Slack message to ${message.recipient}: ${message.content}`
    );
  }
}
