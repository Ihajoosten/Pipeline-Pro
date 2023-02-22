import { ProductOwner } from "./users.model";
import { Sprint } from "./sprint.model";
import { Team } from "./team.model";

export class Project {
  private name: string;
  private productOwner: ProductOwner;
  private sprints: Sprint[] = [];
  private team?: Team;

  public constructor(name: string, productOwner: ProductOwner) {
    this.name = name;
    this.productOwner = productOwner;
  }

  public getProductOwner() {
    return this.productOwner;
  }

  public getName(): string {
    return this.name
  }

  public addSprint(sprint: Sprint): void {
    this.sprints.push(sprint);
  }

  public removeSprint(sprint: Sprint) {
    const index = this.sprints.indexOf(sprint);
    if (index !== -1) {
      this.sprints.splice(index, 1);
    }
  }

  public getSprints(): Sprint[] {
    return this.sprints;
  }

  public setTeam(team: Team) {
    if (!this.team) {
      this.team = team;
    }
  }

  public removeTeam() {
    this.team = undefined;
  }

  // public log(): void {
  //   console.log(`Project: ${this.name}`);
  //   this.children.forEach((child) => child.log());
  // }
}
