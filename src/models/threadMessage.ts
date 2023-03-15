import { User } from "./user.model";

export class ThreadMessage {
  constructor(public content: string, public sender: User["_firstName"]) { }
}
