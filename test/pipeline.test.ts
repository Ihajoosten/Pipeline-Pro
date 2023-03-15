import { NotificationType, ScrumRole } from "../src/models/enumerations";
import { Notification } from "../src/models/notification.model";
import { Pipeline } from "../src/models/pipeline.model";
import { NotificationPreference, User } from "../src/models/user.model";
import { IObserver } from "../src/observer-pattern/interfaces/IObserver";
import { IPipelineState } from "../src/state-pattern/interface/IPipelineState";
import { IPipelineVisitor } from "../src/visitor-pattern/visitors/IPipelineVisitor";

describe("The user should be able to create a pipeline and work in it.", () => {
  let pipeline: Pipeline;
  const pipelineName = "pipeline";
  const scrumMaster = new User("Erdem P.", "erd@em.p", ScrumRole.SCRUM_MASTER);
  let task1: any;
  let task2: any;
  let task3: any;

  beforeEach(() => {
    pipeline = new Pipeline(pipelineName, scrumMaster);
    task1 = { execute: jest.fn() };
    task2 = { execute: jest.fn() };
    task3 = { execute: jest.fn() };
  });

  describe("addTask", () => {
    it("should add a task to the pipeline", () => {
      pipeline.addTask(task1);
      expect(pipeline.getTasks()).toContain(task1);
    });
  });

  describe("removeTask", () => {
    it("should remove a task from the pipeline", () => {
      pipeline.addTask(task1);
      pipeline.addTask(task2);
      pipeline.addTask(task3);
      pipeline.removeTask(task2);
      expect(pipeline.getTasks()).toEqual([task1, task3]);
    });

    it("should not remove a task if it is not in the pipeline", () => {
      pipeline.addTask(task1);
      pipeline.removeTask(task2);
      expect(pipeline.getTasks()).toEqual([task1]);
    });
  });

  describe("setVisitor", () => {
    const mockVisitor: IPipelineVisitor = {
      visit: jest.fn(),
      log: jest.fn(),
      getLog: jest.fn(),
    };

    it("should set the visitor of the pipeline", () => {
      pipeline.setVisitor(mockVisitor);
      expect(pipeline["visitor"]).toEqual(mockVisitor);
    });
  });

  describe("subscribe", () => {
    it("should subscribe an observer to the pipeline", () => {
      const observer = { update: jest.fn() };
      pipeline.subscribe(observer);
      expect(pipeline["observers"]).toContain(observer);
    });
  });

  describe("unsubscribe", () => {
    it("should unsubscribe an observer from the pipeline", () => {
      const observer1 = { update: jest.fn() };
      const observer2 = { update: jest.fn() };
      const observer3 = { update: jest.fn() };
      pipeline.subscribe(observer1);
      pipeline.subscribe(observer2);
      pipeline.subscribe(observer3);
      pipeline.unsubscribe(observer2);
      expect(pipeline["observers"]).toEqual([observer1, observer3]);
    });

    it("should not unsubscribe an observer if it is not subscribed", () => {
      const observer1 = { update: jest.fn() };
      const observer2 = { update: jest.fn() };
      pipeline.subscribe(observer1);
      pipeline.unsubscribe(observer2);
      expect(pipeline["observers"]).toEqual([observer1]);
    });
  });

  describe("notify", () => {
    let notification = new Notification(scrumMaster, "Test Notification");

    it("should notify all observers with the given notification", () => {
      const observer1 = { update: jest.fn() };
      const observer2 = { update: jest.fn() };
      const observer3 = { update: jest.fn() };
      pipeline.subscribe(observer1);
      pipeline.subscribe(observer2);
      pipeline.subscribe(observer3);
      pipeline.notify(notification);
      expect(observer1.update).toHaveBeenCalledWith(notification);
      expect(observer2.update).toHaveBeenCalledWith(notification);
      expect(observer3.update).toHaveBeenCalledWith(notification);
    });
  });
});

describe("execute", () => {
  let pipeline: Pipeline;
  let mockVisitor: IPipelineVisitor;
  let mockNotification: Notification;
  let mockObserver: IObserver;
  let user: User = new User(
    "Luc",
    "lhajoost@avans.nl",
    ScrumRole.SCRUM_MASTER,
    [new NotificationPreference(NotificationType.SLACK, "lhajoost@avans.nl")]
  );

  const mockTask1 = {
    acceptVisitor: jest.fn(),
  } as unknown as IPipelineState;

  const mockTask2 = {
    acceptVisitor: jest.fn(),
  } as unknown as IPipelineState;

  beforeEach(() => {
    pipeline = new Pipeline("testPipeline", user);
    mockVisitor = {
      visit: jest.fn(),
      log: jest.fn(),
      getLog: jest.fn(),
    };
    mockNotification = new Notification(user, "test notification");
    mockObserver = {
      update: jest.fn(),
    };
  });

  it("should execute tasks and notify observers if visitor is defined", () => {
    pipeline.addTask(mockTask1);
    pipeline.addTask(mockTask2);
    pipeline.setVisitor(mockVisitor);

    pipeline.subscribe(mockObserver);

    pipeline.execute();

    mockNotification["message"] = "Pipeline tasks were successfully executed!";
    expect(mockTask1.acceptVisitor).toHaveBeenCalledWith(mockVisitor);
    expect(mockTask2.acceptVisitor).toHaveBeenCalledWith(mockVisitor);
    expect(mockObserver.update).toHaveBeenCalledWith(mockNotification);
  });

  it("should notify observers if there is an error during task execution", () => {
    const mockTask3 = {
      acceptVisitor: jest.fn(() => {
        throw new Error("testError");
      }),
    } as unknown as IPipelineState;

    pipeline.addTask(mockTask3);
    pipeline.setVisitor(mockVisitor);

    pipeline.subscribe(mockObserver);

    pipeline.execute();

    mockNotification["message"] =
      "There was an error during one of the pipeline tasks!";

    expect(mockObserver.update).toHaveBeenCalledWith(mockNotification);
  });

  it("should not execute tasks or notify observers if visitor is undefined", () => {
    const mockTask3 = {
      acceptVisitor: jest.fn(() => {
        throw new Error("testError");
      }),
    } as unknown as IPipelineState;

    pipeline.addTask(mockTask3);

    pipeline.subscribe(mockObserver);

    pipeline.execute();

    expect(mockTask3.acceptVisitor).not.toHaveBeenCalled();
    expect(mockObserver.update).not.toHaveBeenCalled();
  });
});
