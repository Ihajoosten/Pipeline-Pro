import { Composite } from "../composite-pattern/models/composite.model";
import { User } from "./abstract-user.model";

// Team class
export class Team extends Composite {
  name: string;
  users: User[];

  constructor(name: string, users: User[]) {
    super();
    this.name = name;
    this.users = users;
  }

  public log(): void {
    throw new Error("Method not implemented.");
  }

  public override add(component: Composite): void {
    if (component instanceof User) {
      this.children.push(component);
    }
  }
}