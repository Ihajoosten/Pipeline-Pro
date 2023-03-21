import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";

export class SprintClosedState implements ISprintState {
  constructor(private sprint: Sprint) {}
  public create(): () => void {
    return this.throwError("Created");
  }
  public start(): () => void {
    return this.throwError("Active");
  }
  public release(): () => void {
    throw new Error(`Cannot change to Released State from Closed State`);
  }
  public review(): () => void {
    return this.throwError("Reviewed");
  }
  public finish(): () => void {
    return this.throwError("Finished");
  }
  public close(): () => void {
    return this.throwError("Closed");
  }

  private throwError(to: string): any {
    console.log("Sprint is already Closed");
    console.log(`Cannot change to ${to} State from Closed State`);
    throw new Error(`Cannot change to ${to} State from Closed State`);
  }
}
