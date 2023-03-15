import { ScrumRole } from "./enumerations";
import { User } from "./user.model";

export class Team {
  private members: User[] = [];

  constructor(public name: string) { }

  public addMember(user: User) {
    if (!(user.role == ScrumRole.PRODUCT_OWNER || ScrumRole.SCRUM_MASTER)) {
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
