import { AbstractDevelopmentPipeline } from "../../../models/pipeline/abstract-development-pipeline.model";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelinePackageState } from "./package.state";

export class PipelineSourceState implements IPipelineState {
  constructor(private pipeline: AbstractDevelopmentPipeline) {}
  onSource(): void {
    console.log("Pipeline still fetching source code");
    throw new Error("Cannot change to Source State from Source State");
  }
  onPackage(): void {
    console.log(
      "Source Code Fetched, now installing 3rd party packages/libraries"
    );
    this.pipeline.setState(new PipelinePackageState(this.pipeline));
  }
  onBuild(): void {
    console.log("Pipeline still fetching source code");
    throw new Error("Cannot change to Build State from Source State");
  }
  onTest(): void {
    console.log("Pipeline still fetching source code");
    throw new Error("Cannot change to Test State from Source State");
  }
  onAnalyze(): void {
    console.log("Pipeline still fetching source code");
    throw new Error("Cannot change to Analyze State from Source State");
  }
  onDeploy(): void {
    console.log("Pipeline still fetching source code");
    throw new Error("Cannot change to Deploy State from Source State");
  }
}
