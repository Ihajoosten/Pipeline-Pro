import { User } from "./user/user.model";
import { Role } from "./user/roles";

export class Activity {
  private developer?: User;

  public constructor(public name: string, public description: string) {}

  public setDeveloper(user: User) {
    if (user.role == Role.Developer || user.role == Role.LeadDeveloper) {
      this.developer = user;
    }
  }

  public getDeveloper(): User | undefined {
    return this.developer;
  }

  public removeDeveloper() {
    this.developer = undefined;
  }
}
