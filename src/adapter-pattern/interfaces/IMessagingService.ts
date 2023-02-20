import { IMessage } from "./IMessage";

// Interface for the messaging service
export interface IMessagingService {
  sendMessage(message: IMessage): void;
}
