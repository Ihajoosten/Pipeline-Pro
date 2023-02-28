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
    if (this.pipeline) {
      // start pipeline activities
      this.pipeline.execute();

      // check if pipeline reached deployment state
      if (this.pipeline.getState() instanceof PipelineDeployState) {
        //check if deployment was successful

        if (this.pipeline.hasSucceeded) {
          // scrum master now closes sprint
          console.log("Scrum Master is closing the sprint");
          this.sprint.setState(new SprintClosedState(this.sprint));
        } else
          throw new Error(
            "One of the tasks from the pipeline failed, cannot close sprint"
          );
      } else
        throw new Error(
          "Pipeline was in the wrong stage, you cannot close a sprint without the pipeline compeleting deployment"
        );
    } else throw new Error("Pipeline was not identified..");
  }
}
