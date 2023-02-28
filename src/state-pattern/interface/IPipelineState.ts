import { IObserver } from "../../observer-pattern/interfaces/IObserver";
import { ISubject } from "../../observer-pattern/interfaces/ISubject";
import { IPipelineVisitor } from "../../visitor-pattern/visitors/IPipelineVisitor";

export abstract class IPipelineState implements ISubject {
  private observers: IObserver[] = [];

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

  public subscribe(observer: IObserver): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: IObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  public notify(data: any): void {
    this.observers.forEach((observer: IObserver) => {
      observer.update(data);
    });
  }

  abstract onSource(): void;
  abstract onPackage(): void;
  abstract onBuild(): void;
  abstract onTest(): void;
  abstract onAnalyze(): void;
  abstract onDeploy(): void;
  abstract onCancel(): void;
}
