import { User } from "./user/user.model";
import { Role } from "./user/roles";


export class Activity {
  private developer?: User;

  public constructor(public name: string, public description: string) {}

  public setDeveloper(user: User) {
    if (!this.developer && user.role == Role.Developer || Role.LeadDeveloper) {
      this.developer = user;
    }
  }

  public removeDeveloper() {
    this.developer = undefined;
  }

  public getDeveloper(): User | undefined {
    return this.developer;
  }
}
