import { IPipelineState } from "../../state-pattern/interface/IPipelineState";

export interface IPipelineVisitor {
  visit(pipelineStage: IPipelineState): void;
  log(message: string): void;
  getLog(): string;
}
