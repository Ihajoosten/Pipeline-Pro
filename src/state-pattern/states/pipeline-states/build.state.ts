import { Pipeline } from "../../../models/pipeline";
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
    try {
      console.log("Pipeline successfully built project. Testing has started");
      this.pipeline.setState(new PipelineTestState(this.pipeline));
    } catch (error) {
      this.notify(JSON.stringify(error));
    }
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
    try {
      console.log("Scrum Master Cancelled Pipeline");
      this.pipeline.setState(new PipelineCancelledState(this.pipeline));
    } catch (error) {
      this.notify(JSON.stringify(error));
    }
  }

  private logMessage(): void {
    console.log("Pipeline still building project");
  }
}
