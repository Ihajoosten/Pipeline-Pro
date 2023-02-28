import { ISubject } from "../../observer-pattern/interfaces/ISubject";
import { IPipelineVisitor } from "../../visitor-pattern/visitors/IPipelineVisitor";

export interface IPipelineState extends ISubject {
  onSource(): void;
  onPackage(): void;
  onBuild(): void;
  onTest(): void;
  onAnalyze(): void;
  onDeploy(): void;
  acceptVisitor(visitor: IPipelineVisitor): void;
  onCancelled(): void;

  getName(): string;
  getAction(): string;
}
