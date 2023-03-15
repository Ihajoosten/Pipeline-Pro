import { Pipeline } from "../../../models/pipeline.model";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineSourceState } from "./source.state";

export class PipelineCancelledState extends IPipelineState {
  constructor(private pipeline: Pipeline) {
    super("Cancelled Stage", "Cancelled.");
  }

  onSource(): void {
    // Only to this state to restart
    console.log("Pipeline canceled, now restarting tasks");
    this.pipeline.setState(new PipelineSourceState(this.pipeline));
  }

  onPackage(): () => void { return this.throwError('Package'); }
  onBuild(): () => void { return this.throwError('Build'); }
  onTest(): () => void { return this.throwError('Test'); }
  onAnalyze(): () => void { return this.throwError('Analyze'); }
  onDeploy(): () => void { return this.throwError('Deploy'); }
  onCancel(): () => void { return this.throwError('Cancel'); }

  private throwError(to: string): any {
    console.log('Pipeline is canceled')
    console.trace(`Cannot change to ${to} State from Cancel State`);
    throw new Error(`Cannot change to ${to} State from Cancel State`);
  }
}
