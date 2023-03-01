import { Pipeline } from "../../../models/pipeline.model";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineCancelledState } from "./cancelled.state";
import { PipelineTestState } from "./test.state";

export class PipelineBuildState extends IPipelineState {
  constructor(private pipeline: Pipeline) {
    super("Building Stage", "Building...");
  }

  onSource(): void {
    this.logMessage();
    throw new Error("Cannot change to Source State from Build State");
  }

  onPackage(): void {
    this.logMessage();
    throw new Error("Cannot change to Package State from Build State");
  }

  onBuild(): void {
    this.logMessage();
    throw new Error("Cannot change to Package State from Build State");
  }

  onTest(): void {
      console.log("Pipeline successfully built project. Testing has started");
      this.pipeline.setState(new PipelineTestState(this.pipeline));
  }

  onAnalyze(): void {
    this.logMessage();
    throw new Error("Cannot change to Analyze State from Build State");
  }

  onDeploy(): void {
    this.logMessage();
    throw new Error("Cannot change to Deploy State from Build State");
  }

  onCancel(): void {
      console.log("Scrum Master Cancelled Pipeline");
      this.pipeline.setState(new PipelineCancelledState(this.pipeline));
  }

  private logMessage(): void {
    console.log("Pipeline still building project");
  }
}
