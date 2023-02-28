import { IMessage } from "../adapter-pattern/interfaces/IMessage";

export class Message implements IMessage {
  constructor(public content: string, public sender?: string, public recipient?: string) { }
}
