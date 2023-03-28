import { Sprint } from "./sprint.model";
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
  private _scrumMaster?: ScrumMaster;
  private _developers: Array<User>;
  private _sprints: Array<Sprint>;

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
    // Check if created by ...
    this._sprints.push(sprint);
  }

  public getScrumMaster(): any {
    return this._scrumMaster;
  }

  public removeSprint(sprint: Sprint, currentUser: User): void {
    // Check if created by ...
    if (!(currentUser instanceof ScrumMaster))
      throw new Error("Only the Scrum Master can remove a sprint");
    const index = this._sprints.indexOf(sprint);
    if (index !== -1) {
      this._sprints.splice(index, 1);
    }
  }
}
