import { Developer, LeadDeveloper } from "./user/users.model";

export class Activity {
  private developer?: Developer | LeadDeveloper;

  public constructor(public name: string, public description: string) {}

  public setDeveloper(developer: Developer | LeadDeveloper) {
    if (!this.developer) {
      this.developer = developer;
    }
  }

  public removeDeveloper() {
    this.developer = undefined;
  }

  public getDeveloper(): Developer | LeadDeveloper | undefined {
    return this.developer;
  }
}
