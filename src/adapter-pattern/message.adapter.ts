import { IMessage } from "./interfaces/IMessage";
import { IMessagingAdapter } from "./interfaces/IMessagingAdapter";
import { IMessagingService } from "./interfaces/IMessagingService";

export class MessagingServiceAdapter implements IMessagingAdapter {
  private messagingService: IMessagingService;

  constructor(messagingService: IMessagingService) {
    this.messagingService = messagingService;
  }

  public sendMessage(message: IMessage): void {
    this.messagingService.sendMessage(message);
  }
}
