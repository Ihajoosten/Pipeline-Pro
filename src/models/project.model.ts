import { Composite } from "../composite-pattern/models/composite.model";
import { Sprint } from "./sprint.model";
import { Team } from "./team.model";

export class Project extends Composite {
  public constructor(public name: string) {
    super();
  }

  public log(): void {
    console.log(`Project: ${this.name}`);
    this.children.forEach((child) => child.log());
  }

  public override add(component: Composite): void {
    if (component instanceof Sprint || Team) {
      this.children.push(component);
    }
  }
}
