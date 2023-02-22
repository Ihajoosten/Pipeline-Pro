import { User } from "./abstract-user.model";
import { ProductOwner, ScrumMaster } from "./users.model";

export class Team  {
  name: string;
  members: User[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public addMember(member: User) {
    if (!(member instanceof ProductOwner || ScrumMaster)) {
      this.members.push(member);
    }
  }

  public removeUser(member: User) {
    const index = this.members.indexOf(member);
    if (index !== -1) {
      this.members.splice(index, 1);
    }
  }

  public getMembers(): User[] {
    return this.members;
  }

  // public log(): void {
  //   throw new Error("Method not implemented.");
  // }
}
