import { AbstractDevelopmentPipeline } from "../../../models/pipeline/abstract-development-pipeline.model";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineTestState } from "./test.state";

export class PipelineBuildState implements IPipelineState {
  constructor(private pipeline: AbstractDevelopmentPipeline) {}
  onSource(): void {
    console.log("Pipeline still building project");
    throw new Error("Cannot change to Source State from Build State");
  }
  onPackage(): void {
    console.log("Pipeline still building project");
    throw new Error("Cannot change to Package State from Build State");
  }
  onBuild(): void {
    console.log("Pipeline is already building project");
    throw new Error("Cannot change to Package State from Build State");
  }
  onTest(): void {
    console.log("Pipeline successfully built project. Testing has started");
    this.pipeline.setState(new PipelineTestState(this.pipeline));
  }
  onAnalyze(): void {
    console.log("Pipeline still building project");
    throw new Error("Cannot change to Analyze State from Build State");
  }
  onDeploy(): void {
    console.log("Pipeline still building project");
    throw new Error("Cannot change to Deploy State from Build State");
  }
}
