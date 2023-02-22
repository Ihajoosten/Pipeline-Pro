import { IMessage } from "../adapter-pattern/interfaces/IMessage";

export class Message implements IMessage {
  public content: string;
  public sender?: string;
  public recipient?: string;

  constructor(content: string, sender?: string, recipient?: string) {
    this.sender = sender;
    this.content = content;
    this.recipient = recipient
  }

  // public log(): void {
  //   console.log(`Message: ${this.content} - Sender: ${this.sender}`);
  //   this.children.forEach((child) => child.log());
  // }
}
