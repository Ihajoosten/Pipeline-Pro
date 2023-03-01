import { User } from "./user/user.model";

export class ThreadMessage {
  constructor(public content: string, public sender: User["name"]) {}
}
