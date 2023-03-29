import { Sprint } from "./sprint.model";
import { Team } from "./team.model";
import { User, ScrumMaster } from "./user.model";

export class Project {
  private _id: number;
  private _name: string;
  private _startDate: Date;
  private _endDate: Date;
  private _team: Team;
  private _sprints: Array<Sprint>;

  public constructor(
    id: number,
    name: string,
    startDate: Date,
    endDate: Date,
    team: Team,
  ) {
    if (!team.scrumMaster) throw new Error('Invalid Scrum Master!');
    this._id = id;
    this._name = name;
    this._startDate = startDate;
    this._endDate = endDate;
    this._sprints = new Array<Sprint>();
    this._team = team;
  }

  public addSprint(sprint: Sprint): void {
    // Check if created by ...
    this._sprints.push(sprint);
  }

  public getSprints(): Array<Sprint> { return this._sprints }

  public getScrumMaster(): any {
    return this._team.scrumMaster;
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
