import { IMessage } from "../interfaces/IMessage";
import { IMessagingService } from "../interfaces/IMessagingService";

export class SlackService implements IMessagingService {
  public sendMessage(message: IMessage): void {
    console.log(
      `Sending Slack message to ${message.address}: ${message.message}`
    );
  }
}
