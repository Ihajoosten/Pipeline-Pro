import { Pipeline } from "../../../models/pipeline.model";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineCancelledState } from "./cancelled.state";
import { PipelineTestState } from "./test.state";

export class PipelineBuildState extends IPipelineState {
  constructor(private pipeline: Pipeline) {
    super("Building Stage", "Building...");
  }

  onSource(): () => void {
    return this.throwError("Source");
  }
  onPackage(): () => void {
    return this.throwError("Package");
  }
  onBuild(): () => void {
    return this.throwError("Build");
  }
  onAnalyze(): () => void {
    return this.throwError("Analyze");
  }
  onDeploy(): () => void {
    return this.throwError("Deploy");
  }

  onTest(): void {
    console.log("Pipeline successfully built project. Testing has started");
    this.pipeline.setState(new PipelineTestState(this.pipeline));
  }

  onCancel(): void {
    console.log("Scrum Master Cancelled Pipeline");
    this.pipeline.setState(new PipelineCancelledState(this.pipeline));
  }

  private throwError(to: string): any {
    console.log("Pipeline is still being build");
    console.warn(`Cannot change to ${to} State from Build State`);
    throw new Error(`Cannot change to ${to} State from Build State`);
  }
}
