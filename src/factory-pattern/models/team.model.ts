import { User } from "./abstract-user.model";

// Team class
export class Team {
  name: string;
  users: User[];

  constructor(name: string, users: User[]) {
    this.name = name;
    this.users = users;
  }
}