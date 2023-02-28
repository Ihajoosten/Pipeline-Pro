import { Pipeline } from "../../../models/pipeline";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineCancelledState } from "./cancelled.state";

export class PipelineDeployState extends IPipelineState {
  constructor(private pipeline: Pipeline) {
    super("Deployment Stage", "Deploying...");
  }

  onSource(): void {
    this.logMessage();
    throw new Error("Cannot change to Source State from Deploy State");
  }

  onPackage(): void {
    this.logMessage();
    throw new Error("Cannot change to Source State from Deploy State");
  }

  onBuild(): void {
    this.logMessage();
    throw new Error("Cannot change to Build State from Deploy State");
  }

  onTest(): void {
    this.logMessage();
    throw new Error("Cannot change to Test State from Deploy State");
  }

  onAnalyze(): void {
    this.logMessage();
    throw new Error("Cannot change to Analyze State from Deploy State");
  }

  onDeploy(): void {
    this.logMessage();
    throw new Error("Cannot change to Deploy State from Deploy State");
  }
  onCancel(): void {
      console.log("Scrum Master Cancelled Pipeline");
      this.pipeline.setState(new PipelineCancelledState(this.pipeline));
  }

  private logMessage(): void {
    console.log("Project is deployed");
  }
}
