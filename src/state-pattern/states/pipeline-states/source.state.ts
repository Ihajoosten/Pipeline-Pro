import { Pipeline } from "../../../models/pipeline";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineCancelledState } from "./cancelled.state";
import { PipelinePackageState } from "./package.state";

export class PipelineSourceState extends IPipelineState {
  constructor(private pipeline: Pipeline) {
    super("Sourcing Stage", "Sourcing...");
  }
 
  onSource(): void {
    this.logMessage();
    throw new Error("Cannot change to Source State from Source State");
  }

  onPackage(): void {
    try {
      console.log(
        "Source Code Fetched, now installing 3rd party packages/libraries"
      );
      this.pipeline.setState(new PipelinePackageState(this.pipeline));
    } catch (error) {
      this.notify(JSON.stringify(error));
    }
  }

  onBuild(): void {
    this.logMessage();
    throw new Error("Cannot change to Build State from Source State");
  }

  onTest(): void {
    this.logMessage();
    throw new Error("Cannot change to Test State from Source State");
  }

  onAnalyze(): void {
    this.logMessage();
    throw new Error("Cannot change to Analyze State from Source State");
  }

  onDeploy(): void {
    this.logMessage();
    throw new Error("Cannot change to Deploy State from Source State");
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
    console.log("Pipeline still fetching source code");
  }
}
