import { Pipeline } from "../../../models/pipeline.model";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineCancelledState } from "./cancelled.state";
import { PipelinePackageState } from "./package.state";

export class PipelineSourceState extends IPipelineState {
  constructor(private pipeline: Pipeline) {
    super("Sourcing Stage", "Sourcing...");
  }

  onSource(): () => void {
    return this.throwError("Source");
  }
  onBuild(): () => void {
    return this.throwError("Build");
  }
  onTest(): () => void {
    return this.throwError("Test");
  }
  onAnalyze(): () => void {
    return this.throwError("Analyze");
  }
  onDeploy(): () => void {
    return this.throwError("Deploy");
  }

  onPackage(): void {
    console.log(
      "Source Code Fetched, now installing 3rd party packages/libraries"
    );
    this.pipeline.setState(new PipelinePackageState(this.pipeline));
  }

  onCancel(): void {
    console.log("Scrum Master Cancelled Pipeline");
    this.pipeline.setState(new PipelineCancelledState(this.pipeline));
  }

  private throwError(to: string): any {
    console.log("Pipeline is fetching Source code");
    console.warn(`Cannot change to ${to} State from Source State`);
    throw new Error(`Cannot change to ${to} State from Source State`);
  }
}
