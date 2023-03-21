import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { IPipelineState } from "../state-pattern/interface/IPipelineState";
import { PipelineSourceState } from "../state-pattern/states/pipeline-states/source.state";
import { IPipelineVisitor } from "../visitor-pattern/visitors/IPipelineVisitor";
import { ScrumRole } from "./enumerations";
import { Notification } from "./notification.model";
import { LeadDeveloper, User } from "./user.model";

export class Pipeline implements ISubject {
  private state: IPipelineState = new PipelineSourceState(this);
  private tasks: IPipelineState[] = [];
  private observers: IObserver[] = [];
  private visitor?: IPipelineVisitor;
  private isExecuting: boolean = false;

  constructor(private name: string, private productOwner: User, private scrumMaster: User) {
    if (this.productOwner.getRole() !== ScrumRole.PRODUCT_OWNER) {
      throw new Error("Invalid product owner!")
    }
    if (this.scrumMaster.getRole() !== ScrumRole.SCRUM_MASTER) {
      throw new Error("Invalid scrum master!")
    }
  }

  public getName(): string {
    return this.name;
  }

  public addTask(pipelineTask: IPipelineState): void {
    this.tasks.push(pipelineTask);
  }

  public getTasks(): IPipelineState[] {
    return this.tasks;
  }

  public removeTask(pipelineTask: IPipelineState) {
    const index = this.tasks.indexOf(pipelineTask);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  public setVisitor(visitor: IPipelineVisitor): void {
    this.visitor = visitor;
  }

  public execute(): void {
    try {
      this.isExecuting = true;
      if (this.visitor) {
        this.tasks.forEach((task) => {
          task.acceptVisitor(this.visitor!);
        });
        const notificationMessage = `Pipeline tasks were successfully executed!`;
        this.notify(new Notification(
          this.productOwner,
          notificationMessage
        ));
        this.notify(new Notification(
          this.scrumMaster,
          notificationMessage
        ));
      }
    } catch (error) {
      this.isExecuting = false;
      const notificationMessage = `There was an error during one of the pipeline tasks!`;
      this.notify(new Notification(
        this.scrumMaster,
        notificationMessage
      ));
    }
    this.isExecuting = false;
  }

  public isRunning(): boolean {
    return this.isExecuting;
  }

  public getState(): IPipelineState {
    return this.state;
  }

  public setState(state: IPipelineState): void {
    this.state = state;
  }

  public moveToSource(): void {
    this.state.onSource();
  }

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

  public moveToCancel(): void {
    this.state.onCancel();
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
