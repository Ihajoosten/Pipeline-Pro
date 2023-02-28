import { User } from "./user/abstract-user.model";
import { Role } from "./user/roles";

export class Team {
  private members: User[] = [];

  constructor(public name: string) { }

  public addMember(user: User) {
    if (!(user.getRole() == Role.ProductOwner || Role.ScrumMaster)) {
      this.members.push(user);
    }
  }

  public removeMember(member: User) {
    const index = this.members.indexOf(member);
    if (index !== -1) {
      this.members.splice(index, 1);
    }
  }

  public getMembers(): User[] {
    return this.members;
  }
}
