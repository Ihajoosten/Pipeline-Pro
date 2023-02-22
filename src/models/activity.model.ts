import { Developer, LeadDeveloper } from "./users.model";

export class Activity {
  public name: string;
  public description: string;
  private developer?: Developer | LeadDeveloper

  public constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  public setDeveloper(developer: Developer | LeadDeveloper) {
    if (!developer) {
      this.developer = developer;
    }
  }

  public removeDeveloper() {
    this.developer = undefined;
  }

  public getDeveloper(): Developer | LeadDeveloper | void {
    if (this.developer) {
      return this.developer;
    }
  }

  // public log(): void {
  //   console.log(`Activity: ${this.name}`);
  //   this.children.forEach((child) => child.log());
  // }
}
