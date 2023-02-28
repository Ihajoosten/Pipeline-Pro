import { Pipeline } from "../../../models/pipeline";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineBuildState } from "./build.state";
import { PipelineCancelledState } from "./cancelled.state";

export class PipelinePackageState extends IPipelineState {
  constructor(private pipeline: Pipeline) {
    super("Packaging Stage", "Packaging...");
  }

  onSource(): void {
    this.logMessage();
    throw new Error("Cannot change to Source State from Package State");
  }

  onPackage(): void {
    this.logMessage();
    throw new Error("Cannot change to Package State from Package State");
  }

  onBuild(): void {
    try {
      console.log("Packages/Libraries installed, now building the pipeline");
      this.pipeline.setState(new PipelineBuildState(this.pipeline));
    } catch (error) {
      this.notify(JSON.stringify(error));
    }
  }

  onTest(): void {
    this.logMessage();
    throw new Error("Cannot change to Test State from Package State");
  }

  onAnalyze(): void {
    this.logMessage();
    throw new Error("Cannot change to Analyze State from Package State");
  }

  onDeploy(): void {
    this.logMessage();
    throw new Error("Cannot change to Deploy State from Package State");
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
    console.log("Pipeline still installing 3rd party libraries / packages");
  }
}
