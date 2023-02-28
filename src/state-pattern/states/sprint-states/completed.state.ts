import { Pipeline } from "../../../models/pipeline";
import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { PipelineDeployState } from "../pipeline-states/deploy.state";
import { SprintClosedState } from "./closed.state";

export class SprintCompletedState implements ISprintState {
  constructor(private sprint: Sprint, private pipeline?: Pipeline) {}
  onCreate(): void {
    console.log("Sprint is already completed");
    throw new Error("Cannot change state from Completed to Created");
  }
  onStart(): void {
    console.log("Sprint is already completed");
    throw new Error("Cannot change state from Completed to Active");
  }
  onFinish(): void {
    console.log("Sprint is already completed");
    throw new Error("Cannot change state from Completed to Finished");
  }
  onReview(): void {
    console.log("Sprint is already completed");
    throw new Error("Cannot change state from Completed to Reviewed");
  }
  onComplete(): void {
    console.log("Sprint is already completed");
    throw new Error("Cannot change state from Completed to Completed");
  }
  onClose(): void {
    console.log("Scrum Master is closing the sprint");
    this.sprint.setState(new SprintClosedState(this.sprint));
  }
}
