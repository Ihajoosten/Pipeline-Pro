import { IMessage } from "./IMessage";

// Interface for the messaging service
export interface IMessagingService {
  name: string;
  sendMessage(message: IMessage | null | {}): void;
}
