import { Composite } from "../composite-pattern/models/composite.model";
import { Developer, LeadDeveloper } from "./users.model";

export class Activity extends Composite {
  public name: string;
  public description: string;

  public constructor(name: string, description: string) {
    super();
    this.name = name;
    this.description = description;
  }

  public log(): void {
    console.log(`Activity: ${this.name}`);
    this.children.forEach((child) => child.log());
  }

  public override add(component: Composite): void {
    if (!(component instanceof Developer || LeadDeveloper)) {
      return;
    }

    let containsDeveloper = false;
    this.children.forEach((child) => {
      if (child instanceof Developer || LeadDeveloper) {
        containsDeveloper = true;
      }
    });

    if (!containsDeveloper) {
      this.children.push(component);
    }
  }
}
