import { IObserver } from "../../observer-pattern/interfaces/IObserver";
import { ISubject } from "../../observer-pattern/interfaces/ISubject";
import { IPipelineState } from "../../state-pattern/interface/IPipelineState";
import { PipelineSourceState } from "../../state-pattern/states/pipeline-states/source.state";

export abstract class AbstractDevelopmentPipeline implements ISubject {
  private state: IPipelineState;
  private observers: Array<IObserver>;
  private name: string;

  constructor(name: string) {
    this.state = new PipelineSourceState(this);
    this.observers = new Array<IObserver>();
    this.name = name;
  }

  // Observer methods
  public subscribe(observer: IObserver): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: IObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  public notify(): void {
    this.observers.forEach((observer: IObserver) => {
      observer.update(this.state);
    });
  }


  public getState(): IPipelineState {
    return this.state;
  }

  public setState(state: IPipelineState): void {
    this.state = state;
  }

  // State change methods
  public moveToPackage(): void {
    this.state.onPackage();
  }

  public moveToBuild(): void {
    this.state.onBuild();
  }

  public moveToTest(): void {
    this.state.onTest();
  }

  public moveToAnalyze(): void {
    this.state.onAnalyze();
  }

  public moveToDeploy(): void {
    this.state.onDeploy();
  }
}
