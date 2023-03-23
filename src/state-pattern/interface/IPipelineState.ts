import { IPipelineVisitor } from "../../visitor-pattern/IPipelineVisitor";

export abstract class IPipelineState {
  constructor(private name: string, private action: string) {
    this.name = name;
    this.action = action;
  }

  public getName(): string {
    return this.name;
  }

  public getAction(): string {
    return this.action;
  }

  public acceptVisitor(visitor: IPipelineVisitor): void {
    visitor.visit(this);
  }

  abstract onSource(): void;
  abstract onPackage(): void;
  abstract onBuild(): void;
  abstract onTest(): void;
  abstract onAnalyze(): void;
  abstract onDeploy(): void;
  abstract onCancel(): void;
}
