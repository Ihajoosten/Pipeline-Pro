import { Pipeline } from "../../../models/pipeline";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineSourceState } from "./source.state";

export class PipelineCancelledState extends IPipelineState {
  constructor(private pipeline: Pipeline) {
    super("Cancelled Stage", "Cancelled.");
    this.notify("Development Pipeline cancelled");
  }

  onSource(): void {
    // Only to this state to restart
    try {
      console.log("Pipeline cancelled, now restarting tasks");
      this.pipeline.setState(new PipelineSourceState(this.pipeline));
    } catch (error) {
      this.notify(JSON.stringify(error));
    }
  }

  onPackage(): void {
    this.logMessage();
    throw new Error("Cannot change to Package State from Cancelled State");
  }

  onBuild(): void {
    this.logMessage();
    throw new Error("Cannot change to Build State from Cancelled State");
  }

  onTest(): void {
    this.logMessage();
    throw new Error("Cannot change to Test State from Cancelled State");
  }

  onAnalyze(): void {
    this.logMessage();
    throw new Error("Cannot change to Analyze State from Cancelled State");
  }

  onDeploy(): void {
    this.logMessage();
    throw new Error("Cannot change to Deploy State from Cancelled State");
  }

  onCancel(): void {
    this.logMessage();
    throw new Error("Cannot change to Cancelled State from Cancelled State");
  }

  private logMessage(): void {
    console.log("Project is cancelled");
  }
}
