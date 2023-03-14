import { Sprint } from "./sprint.model";
import { Team } from "./team.model";
import { User } from "./user/user.model";
import { Role } from "./user/roles";

export class Project {
  private sprints: Sprint[] = [];

  public constructor(
    public name: string,
    private productOwner: User,
    private team: Team
  ) {
    if (productOwner.role !== Role.ProductOwner) {
      throw new Error("Invalid product owner!");
    }
  }

  public getProductOwner(): User {
    return this.productOwner;
  }

  public addSprint(sprint: Sprint): void {
    this.sprints.push(sprint);
  }

  public getSprints(): Sprint[] {
    return this.sprints;
  }

  public removeSprint(sprint: Sprint): void {
    const index = this.sprints.indexOf(sprint);
    if (index !== -1) {
      this.sprints.splice(index, 1);
    }
  }

  public getTeam(): Team {
    return this.team;
  }
}
