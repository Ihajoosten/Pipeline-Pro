import { Pipeline } from "../../../models/pipeline.model";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineCancelledState } from "./cancelled.state";
import { PipelineDeployState } from "./deploy.state";

export class PipelineAnalyzeState extends IPipelineState {
  constructor(private pipeline: Pipeline) {
    super("Analyzing Stage", "Analyzing...");
  }

  onSource(): () => void { return this.throwError('Source'); }
  onPackage(): () => void { return this.throwError('Package'); }
  onBuild(): () => void { return this.throwError('Build'); }
  onTest(): () => void { return this.throwError('Test'); }
  onAnalyze(): () => void { return this.throwError('Analyze'); }


  onDeploy(): void {
    console.log("Analysis complete, now deploying project");
    this.pipeline.setState(new PipelineDeployState(this.pipeline));
  }

  onCancel(): void {
    console.log("Scrum Master Cancelled Pipeline");
    this.pipeline.setState(new PipelineCancelledState(this.pipeline));
  }

  private throwError(to: string): any {
    console.log('Pipeline is still performing Analysis on Coverage')
    console.log(`Cannot change to ${to} State from Analyze State`);
    throw new Error(`Cannot change to ${to} State from Analyze State`);
  }
}
