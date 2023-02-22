// Interface for the message to be sent
export interface IMessage {
  content: string;
  sender?: string;
  recipient?: string;
}
