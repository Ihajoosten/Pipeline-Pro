import { Pipeline } from "../../../models/pipeline.model";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineBuildState } from "./build.state";
import { PipelineCancelledState } from "./cancelled.state";

export class PipelinePackageState extends IPipelineState {
  constructor(private pipeline: Pipeline) {
    super("Packaging Stage", "Packaging...");
  }

  onSource(): () => void {
    return this.throwError("Source");
  }
  onPackage(): () => void {
    return this.throwError("Package");
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

  onBuild(): void {
    console.log("Packages/Libraries installed, now building the pipeline");
    this.pipeline.setState(new PipelineBuildState(this.pipeline));
  }

  onCancel(): void {
    console.log("Scrum Master Cancelled Pipeline");
    this.pipeline.setState(new PipelineCancelledState(this.pipeline));
  }

  private throwError(to: string): any {
    console.log("Pipeline is installing Packages / 3rd party libraries");
    console.warn(`Cannot change to ${to} State from Package State`);
    throw new Error(`Cannot change to ${to} State from Package State`);
  }
}
