import { User } from "./user/user.model";

export class Message {
  constructor(public content: string, public sender: User) { }
}
