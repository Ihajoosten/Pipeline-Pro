import { ScrumRole } from "./enumerations";
import { Sprint } from "./sprint.model";
import { Team } from "./team.model";
import {
  Developer,
  LeadDeveloper,
  ProductOwner,
  ScrumMaster,
  User,
} from "./user.model";

export class Project {
  private _id: number;
  private _name: string;
  private _startDate: Date;
  private _endDate: Date;
  private _productOwner: ProductOwner;
  private _scrumMaster: ScrumMaster;
  private _developers: Array<User>;
  private _sprints: Array<Sprint>;
  // private _forum: Forum;

  public constructor(
    id: number,
    name: string,
    startDate: Date,
    endDate: Date,
    productOwner: ProductOwner,
    scrumMaster: ScrumMaster,
    developers: Array<Developer | LeadDeveloper>
  ) {
    this._id = id;
    this._name = name;
    this._startDate = startDate;
    this._endDate = endDate;
    this._productOwner = productOwner;
    this._scrumMaster = scrumMaster;
    this._developers = developers;
    this._sprints = new Array<Sprint>();
  }

  public addSprint(sprint: Sprint): void {
    if (
      this._scrumMaster &&
      this._scrumMaster.getRole() === ScrumRole.SCRUM_MASTER
    ) {
      this._sprints.push(sprint);
      console.log(`Added sprint ${sprint.getName()} to ${this._name}`);
    } else {
      console.log(`There is no scrum master assigned to ${this._name}`);
    }
  }
  public removeSprint(sprintId: number, currentUser: User) {
    if (currentUser instanceof ScrumMaster) {
      throw new Error("Only the Scrum Master can remove a sprint");
    }

    const sprintIndex = this._sprints.findIndex(
      (sprint) => sprint.getId() === sprintId
    );
    if (sprintIndex === -1) {
      throw new Error("Sprint not found in the project");
    }

    const removedSprint = this._sprints.splice(sprintIndex, 1)[0];

    return removedSprint;
  }
}
