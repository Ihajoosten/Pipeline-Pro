import { ISprintState } from "../state-pattern/interface/ISprintState";
import { BacklogItem } from "./backlogItem.model";
import { User } from "./user.model";
import { SprintCreatedState } from "../state-pattern/states/sprint-states/created.state";
import { SprintActiveState } from "../state-pattern/states/sprint-states/active.state";
import { Pipeline } from "./pipeline.model";
import { ScrumRole } from "./enumerations";

export class Sprint {
  private backlogItems: BacklogItem[] = [];
  private sprintState: ISprintState;

  constructor(
    private name: string,
    private startDate: Date,
    private endDate: Date,
    private scrumMaster: User,
    private pipeline: Pipeline
  ) {
    if (scrumMaster.role !== ScrumRole.SCRUM_MASTER) {
      throw new Error("Invalid scrum master!");
    }
    this.sprintState = new SprintCreatedState(this);
  }

  public getName(): string {
    return this.name;
  }

  public getStartDate(): Date {
    return this.startDate;
  }

  public getEndDate(): Date {
    return this.endDate;
  }

  public getScrumMaster(): User {
    return this.scrumMaster;
  }

  public addBacklogItem(partialBacklogItem: Omit<BacklogItem, "scrumMaster">) {
    const backlogItem = new BacklogItem(
      partialBacklogItem.id,
      partialBacklogItem.name,
      partialBacklogItem.description,
      this.scrumMaster
    );
    this.backlogItems.push(backlogItem);
  }

  public getBacklogItems(): BacklogItem[] {
    return this.backlogItems;
  }

  public removeBacklogItem(backlogItem: BacklogItem) {
    const index = this.backlogItems.indexOf(backlogItem);
    if (index !== -1) {
      this.backlogItems.splice(index, 1);
    }
  }

  public setState(state: ISprintState): void {
    this.sprintState = state;
  }

  public getState(): ISprintState {
    return this.sprintState;
  }

  public updateSprint(
    name?: string,
    startDate?: Date,
    endDate?: Date,
    scrumMaster?: User,
    pipeline?: Pipeline
  ): void {
    if (this.sprintState instanceof SprintActiveState) {
      throw new Error("Cannot update Sprint because it has already started!");
    }
    if (name) this.name = name;
    if (startDate) this.startDate = startDate;
    if (endDate) this.endDate = endDate;
    if (scrumMaster && scrumMaster.role == ScrumRole.SCRUM_MASTER)
      this.scrumMaster = scrumMaster;
    if (pipeline) this.pipeline = pipeline;
  }

  public create(user: User): void {
    this.checkRole(user.role);
    this.sprintState.create();
  }

  public start(user: User): void {
    this.checkRole(user.role);
    this.sprintState.start();
  }

  public finish(user: User): void {
    this.checkRole(user.role);
    this.sprintState.finish();
  }

  public release(user: User): void {
    this.checkRole(user.role);
    this.sprintState.release();
  }

  public review(user: User): void {
    this.checkRole(user.role);
    this.sprintState.review();
  }

  public close(user: User): void {
    this.checkRole(user.role);
    this.pipeline.execute();
    this.sprintState.close();
  }

  private checkRole(role: ScrumRole): void {
    if (role !== ScrumRole.SCRUM_MASTER) {
      throw new Error("Only the scrum master can perform this action!");
    }
  }
}
