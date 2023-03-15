import { Pipeline } from "../../../models/pipeline.model";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineAnalyzeState } from "./analyze.state";
import { PipelineCancelledState } from "./cancelled.state";

export class PipelineTestState extends IPipelineState {
  constructor(private pipeline: Pipeline) {
    super("Testing Stage", "Testing...");
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
  onDeploy(): () => void {
    return this.throwError("Deploy");
  }

  onAnalyze(): void {
    console.log(
      "All tests have succeeded. Next job is analyzing code on coverage"
    );
    this.pipeline.setState(new PipelineAnalyzeState(this.pipeline));
  }

  onCancel(): void {
    console.log("Scrum Master Cancelled Pipeline");
    this.pipeline.setState(new PipelineCancelledState(this.pipeline));
  }

  private throwError(to: string): any {
    console.log("Pipeline being Tested");
    console.trace(`Cannot change to ${to} State from Test State`);
    throw new Error(`Cannot change to ${to} State from Test State`);
  }
}
