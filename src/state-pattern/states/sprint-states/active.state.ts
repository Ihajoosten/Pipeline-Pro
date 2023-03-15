import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintFinishedState } from "./finished.state";

export class SprintActiveState implements ISprintState {
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
  public review(): () => void {
    return this.throwError("Reviewed");
  }
  public close(): () => void {
    return this.throwError("Closed");
  }

  public finish(): void {
    console.log("Scrum Master is finishing the sprint!");
    this.sprint.setState(new SprintFinishedState(this.sprint));
  }

  private throwError(to: string): any {
    console.log("Sprint is already Active");
    console.log(`Cannot change to ${to} State from Active State`);
    throw new Error(`Cannot change to ${to} State from Active State`);
  }
}
