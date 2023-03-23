import { IPipelineState } from "../state-pattern/interface/IPipelineState";
import { IPipelineVisitor } from "./IPipelineVisitor";

export class SimpleLogVisitor implements IPipelineVisitor {
  private message: string = "";

  visit(pipelineStage: IPipelineState): void {
    this.log(`${pipelineStage.getName()}: ${pipelineStage.getAction()}`);
  }

  public log(message: string): void {
    this.message = message;
    console.log(this.message);
  }

  public getLog(): string {
    return this.message;
  }
}
