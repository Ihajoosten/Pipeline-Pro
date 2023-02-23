import { AbstractPipelineVisitor } from "./visitors/pipelineVisitor";

export abstract class Component {

  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public abstract AcceptVisitor(visitor: AbstractPipelineVisitor): void
}