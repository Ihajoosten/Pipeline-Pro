import { Sprint } from "./sprint.model";
import { Team } from "./team.model";
import { ProductOwner } from "./user/users.model";

export class Project {
  private name: string;
  private productOwner: ProductOwner;
  private sprints: Sprint[] = [];
  private team?: Team;

  public constructor(name: string, productOwner: ProductOwner) {
    this.name = name;
    this.productOwner = productOwner;
  }

  public getName(): string {
    return this.name;
  }

  public getProductOwner(): ProductOwner {
    return this.productOwner;
  }

  public addSprint(sprint: Sprint): void {
    this.sprints.push(sprint);
  }

  public removeSprint(sprint: Sprint): void {
    const index = this.sprints.indexOf(sprint);
    if (index !== -1) {
      this.sprints.splice(index, 1);
    }
  }

  public getSprints(): Sprint[] {
    return this.sprints;
  }

  public addTeam(team: Team): void {
    if (!this.team) {
      this.team = team;
    }
  }

  public removeTeam(): void {
    this.team = undefined;
  }

  public getTeam(): Team | undefined {
    return this.team;
  }
}
