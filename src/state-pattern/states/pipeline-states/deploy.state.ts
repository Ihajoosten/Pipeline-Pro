import { Pipeline } from "../../../models/pipeline.model";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineCancelledState } from "./cancelled.state";

export class PipelineDeployState extends IPipelineState {
  constructor(private pipeline: Pipeline) {
    super("Deployment Stage", "Deploying...");
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
  onTest(): () => void {
    return this.throwError("Test");
  }
  onAnalyze(): () => void {
    return this.throwError("Analyze");
  }
  onDeploy(): () => void {
    return this.throwError("Deploy");
  }

  onCancel(): void {
    console.log("Scrum Master Cancelled Pipeline");
    this.pipeline.setState(new PipelineCancelledState(this.pipeline));
  }

  private throwError(to: string): any {
    console.log("Pipeline is being deployed at a cloud provider");
    console.trace(`Cannot change to ${to} State from Deploy State`);
    throw new Error(`Cannot change to ${to} State from Deploy State`);
  }
}
