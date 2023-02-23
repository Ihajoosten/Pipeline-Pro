import { AbstractDevelopmentPipeline } from "../../../models/pipeline/abstract-development-pipeline.model";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineBuildState } from "./build.state";

export class PipelinePackageState implements IPipelineState {
  constructor(private pipeline: AbstractDevelopmentPipeline) {}
  onSource(): void {
    console.log("Pipeline still installing 3rd party libraries / packages");
    throw new Error("Cannot change to Source State from Package State");
  }
  onPackage(): void {
    console.log("Pipeline still installing 3rd party libraries / packages");
    throw new Error("Cannot change to Package State from Package State");
  }
  onBuild(): void {
    console.log("Packages/Libraries installed, now building the pipeline");
    this.pipeline.setState(new PipelineBuildState(this.pipeline));
  }
  onTest(): void {
    console.log("Pipeline still installing 3rd party libraries / packages");
    throw new Error("Cannot change to Test State from Package State");
  }
  onAnalyze(): void {
    console.log("Pipeline still installing 3rd party libraries / packages");
    throw new Error("Cannot change to Analyze State from Package State");
  }
  onDeploy(): void {
    console.log("Pipeline still installing 3rd party libraries / packages");
    throw new Error("Cannot change to Deploy State from Package State");
  }
}
