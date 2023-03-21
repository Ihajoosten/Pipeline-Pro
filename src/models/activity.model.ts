import { ScrumRole } from "./enumerations";
import { User } from "./user.model";

export class Activity {
  private _developer?: User;
  public _isDone: boolean = false;

  public constructor(public name: string, public description: string) {}
  public setDeveloper(user: User) {
    if (
      user.getRole() == ScrumRole.DEVELOPER ||
      user.getRole() == ScrumRole.LEAD_DEVELOPER
    ) {
      this._developer = user;
    }
  }

  public getDeveloper(): User | undefined {
    return this._developer;
  }

  public removeDeveloper() {
    this._developer = undefined;
  }
}
