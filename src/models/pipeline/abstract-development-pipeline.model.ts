import { IPipelineState } from "../../state-pattern/interface/IPipelineState";
import { PipelineSourceState } from "../../state-pattern/states/pipeline-states/source.state";

export abstract class AbstractDevelopmentPipeline {
  private state: IPipelineState;
  private name: string;

  constructor(name: string) {
    this.state = new PipelineSourceState(this);
    this.name = name;
  }

  public getState(): IPipelineState {
    return this.state;
  }

  public setState(state: IPipelineState): void {
    this.state = state;
  }
}
