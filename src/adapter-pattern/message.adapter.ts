import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { Thread } from "../models/thread.model";
import { IMessage } from "./interfaces/IMessage";
import { IMessagingAdapter } from "./interfaces/IMessagingAdapter";
import { IMessagingService } from "./interfaces/IMessagingService";

// Implementation of the MessagingAdapter that uses a MessagingService
export class MessagingServiceAdapter implements IMessagingAdapter {
  private messagingService: IMessagingService;

  constructor(messagingService: IMessagingService) {
    this.messagingService = messagingService;
  }

  public sendMessage(message: IMessage): void {
    this.messagingService.sendMessage(message);
  }
}
