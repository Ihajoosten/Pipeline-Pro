import { Pipeline } from "../../../models/pipeline";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineCancelledState } from "./cancelled.state";
import { PipelineDeployState } from "./deploy.state";

export class PipelineAnalyzeState extends IPipelineState {
  constructor(private pipeline: Pipeline) {
    super("Analyzing Stage", "Analyzing...");
  }

  onSource(): void {
    this.logMessage();
    throw new Error("Cannot change to Source State from Analyze State");
  }

  onPackage(): void {
    this.logMessage();
    throw new Error("Cannot change to Source State from Analyze State");
  }

  onBuild(): void {
    this.logMessage();
    throw new Error("Cannot change to Build State from Analyze State");
  }

  onTest(): void {
    this.logMessage();
    throw new Error("Cannot change to Test State from Analyze State");
  }

  onAnalyze(): void {
    this.logMessage();
    throw new Error("Cannot change to Analyze State from Analyze State");
  }

  onDeploy(): void {
      console.log("Analysis complete, now deploying project");
      this.pipeline.setState(new PipelineDeployState(this.pipeline));
  }

  onCancel(): void {
      console.log("Scrum Master Cancelled Pipeline");
      this.pipeline.setState(new PipelineCancelledState(this.pipeline));
  }

  private logMessage(): void {
    console.log("Pipeline is already analyzing project");
  }
}
