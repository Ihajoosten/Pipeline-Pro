import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintClosedState } from "./closed.state";

export class SprintReviewedState implements ISprintState {
  constructor(private sprint: Sprint) {}

  public create(): () => void {
    return this.throwError("Created");
  }
  public start(): () => void {
    return this.throwError("Active");
  }
  public release(): () => void {
    return this.throwError("Released");
  }
  public finish(): () => void {
    return this.throwError("Finished");
  }
  public review(): () => void {
    return this.throwError("Reviewed");
  }

  close(): void {
    console.log("Scrum Master is closing the sprin!t");
    this.sprint.setState(new SprintClosedState(this.sprint));
  }

  private throwError(to: string): any {
    console.log("Sprint is already Reviewed");
    console.log(`Cannot change to ${to} State from Reviewed State`);
    throw new Error(`Cannot change to ${to} State from Reviewed State`);
  }
}
