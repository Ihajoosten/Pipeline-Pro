import { IMessage } from "../adapter-pattern/interfaces/IMessage";

export class Message implements IMessage {
  public content: string;
  public sender?: string;
  public recipient?: string;

  constructor(content: string, sender?: string, recipient?: string) {
    this.content = content;
    this.sender = sender;
    this.recipient = recipient;
  }
}
