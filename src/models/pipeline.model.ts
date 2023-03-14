import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { IPipelineState } from "../state-pattern/interface/IPipelineState";
import { PipelineSourceState } from "../state-pattern/states/pipeline-states/source.state";
import { IPipelineVisitor } from "../visitor-pattern/visitors/IPipelineVisitor";
import { GitIntegration } from "./repository";
import { Notification } from "./notification.model";
import { User } from "./user/user.model";

export class Pipeline implements ISubject {
  private state: IPipelineState = new PipelineSourceState(this);
  private tasks: IPipelineState[] = [];
  private observers: IObserver[] = [];
  private visitor?: IPipelineVisitor;

  constructor(
    private name: string,
    private scrumMaster: User,
    private gitIntegration: GitIntegration
  ) {}

  public getName(): string {
    return this.name;
  }

  public addTask(pipelineTask: IPipelineState) {
    this.tasks.push(pipelineTask);
  }

  public removeTask(pipelineTask: IPipelineState) {
    const index = this.tasks.indexOf(pipelineTask);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  public setVisitor(visitor: IPipelineVisitor) {
    this.visitor = visitor;
  }

  public execute(): void {
    try {
      if (this.visitor) {
        this.tasks.forEach((task) => {
          task.acceptVisitor(this.visitor!);
        });
        const notificationMessage = `Pipeline tasks were successfully executed!`;
        const notification = new Notification(
          this.scrumMaster,
          notificationMessage
        );
        this.notify(notification);
      }
    } catch (error) {
      const notificationMessage = `There was an error during one of the pipeline tasks!`;
      const notification = new Notification(
        this.scrumMaster,
        notificationMessage
      );
      this.notify(notification);
    }
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

  public subscribe(observer: IObserver) {
    this.observers.push(observer);
  }

  public unsubscribe(observer: IObserver) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  public notify(notification: Notification) {
    for (const observer of this.observers) {
      observer.update(notification);
    }
  }
}
