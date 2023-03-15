import { ScrumRole } from "./enumerations";
import { User } from "./user.model";

export class Activity {
  private developer?: User;

  public constructor(public name: string, public description: string) {}

  public setDeveloper(user: User) {
    if (
      user.role == ScrumRole.DEVELOPER ||
      user.role == ScrumRole.LEAD_DEVELOPER
    ) {
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
