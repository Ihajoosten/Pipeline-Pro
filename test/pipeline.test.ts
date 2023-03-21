import { UserFactory } from "../src/factory-pattern/user-factory";
import { ScrumRole } from "../src/models/enumerations";
import { Notification } from "../src/models/notification.model";
import { Pipeline } from "../src/models/pipeline.model";
import { User } from "../src/models/user.model";
import { IObserver } from "../src/observer-pattern/interfaces/IObserver";
import { IPipelineState } from "../src/state-pattern/interface/IPipelineState";
import { PipelineAnalyzeState } from "../src/state-pattern/states/pipeline-states/analyze.state";
import { PipelineBuildState } from "../src/state-pattern/states/pipeline-states/build.state";
import { PipelineCancelledState } from "../src/state-pattern/states/pipeline-states/cancelled.state";
import { PipelineDeployState } from "../src/state-pattern/states/pipeline-states/deploy.state";
import { PipelinePackageState } from "../src/state-pattern/states/pipeline-states/package.state";
import { PipelineSourceState } from "../src/state-pattern/states/pipeline-states/source.state";
import { PipelineTestState } from "../src/state-pattern/states/pipeline-states/test.state";
import { IPipelineVisitor } from "../src/visitor-pattern/visitors/IPipelineVisitor";

describe("Pipeline Tests", () => {
  let pipeline: Pipeline;
  const pipelineName = "pipeline";
  let productOwner: User;
  let scrumMaster: User;
  let task1: any;
  let task2: any;
  let task3: any;
  let observer1: any;
  let observer2: any;
  let observer3: any;

  beforeEach(() => {
    productOwner = new UserFactory().createUser(
      "Erdem",
      "Pekguzel",
      "erdempekguzel@avans.nl",
      "0697513489",
      [],
      ScrumRole.PRODUCT_OWNER
    );
    scrumMaster = new UserFactory().createUser(
      "Erdem",
      "Pekguzel",
      "erdempekguzel@avans.nl",
      "0697513489",
      [],
      ScrumRole.SCRUM_MASTER
    );
    pipeline = new Pipeline(pipelineName, productOwner, scrumMaster);
    task1 = { execute: jest.fn() };
    task2 = { execute: jest.fn() };
    task3 = { execute: jest.fn() };
    observer1 = { update: jest.fn() };
    observer2 = { update: jest.fn() };
    observer3 = { update: jest.fn() };
  });

  describe("constructor", () => {
    it("should throw an error when providing an invalid product owner", () => {
      expect(() => {
        new Pipeline(pipelineName, scrumMaster, scrumMaster);
      }).toThrowError();
    });

    it("should throw an error when providing an invalid scrum master", () => {
      expect(() => {
        new Pipeline(pipelineName, productOwner, productOwner);
      }).toThrowError();
    });
  })

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
      pipeline.subscribe(observer1);
      expect(pipeline["observers"]).toContain(observer1);
    });
  });

  describe("unsubscribe", () => {
    it("should unsubscribe an observer from the pipeline", () => {
      pipeline.subscribe(observer1);
      pipeline.subscribe(observer2);
      pipeline.subscribe(observer3);
      pipeline.unsubscribe(observer2);
      expect(pipeline["observers"]).toEqual([observer1, observer3]);
    });

    it("should not unsubscribe an observer if it is not subscribed", () => {
      pipeline.subscribe(observer1);
      pipeline.unsubscribe(observer2);
      expect(pipeline["observers"]).toEqual([observer1]);
    });
  });

  describe("notify", () => {
    const notification = new Notification(scrumMaster, "Test Notification");
    it("should notify all observers with the given notification", () => {
      pipeline.subscribe(observer1);
      pipeline.subscribe(observer2);
      pipeline.subscribe(observer3);
      pipeline.notify(notification);
      expect(observer1.update).toHaveBeenCalledWith(notification);
      expect(observer2.update).toHaveBeenCalledWith(notification);
      expect(observer3.update).toHaveBeenCalledWith(notification);
    });
  });

  describe("execute", () => {
    let mockVisitor: IPipelineVisitor;
    let mockNotification: Notification;
    let mockObserver: IObserver;
    let mockTask: IPipelineState;
    let mockTask2: IPipelineState;
    let mockTask3: IPipelineState;

    beforeEach(() => {
      mockVisitor = {
        visit: jest.fn(),
        log: jest.fn(),
        getLog: jest.fn(),
      };
      mockNotification = new Notification(scrumMaster, "test notification");
      mockObserver = {
        update: jest.fn(),
      };
      mockTask = {
        acceptVisitor: jest.fn(),
      } as unknown as IPipelineState;
      mockTask2 = {
        acceptVisitor: jest.fn(),
      } as unknown as IPipelineState;
      mockTask3 = {
        acceptVisitor: jest.fn(() => {
          throw new Error("testError");
        }),
      } as unknown as IPipelineState;
    });

    it("should execute tasks and notify observers if visitor is defined", () => {
      pipeline.addTask(mockTask);
      pipeline.addTask(mockTask2);
      pipeline.setVisitor(mockVisitor);
      pipeline.subscribe(mockObserver);
      pipeline.execute();
      mockNotification["message"] =
        "Pipeline tasks were successfully executed!";
      expect(mockTask.acceptVisitor).toHaveBeenCalledWith(mockVisitor);
      expect(mockTask2.acceptVisitor).toHaveBeenCalledWith(mockVisitor);
      expect(mockObserver.update).toHaveBeenCalledWith(mockNotification);
    });

    it("should notify observers if there is an error during task execution", () => {
      pipeline.addTask(mockTask3);
      pipeline.setVisitor(mockVisitor);
      pipeline.subscribe(mockObserver);
      pipeline.execute();
      mockNotification["message"] =
        "There was an error during one of the pipeline tasks!";
      expect(mockObserver.update).toHaveBeenCalledWith(mockNotification);
    });

    it("should not execute tasks or notify observers if visitor is undefined", () => {
      pipeline.addTask(mockTask3);
      pipeline.subscribe(mockObserver);
      pipeline.execute();
      expect(mockTask3.acceptVisitor).not.toHaveBeenCalled();
      expect(mockObserver.update).not.toHaveBeenCalled();
    });
  });

  describe("Pipeline Source State Tests", () => {
    beforeEach(() => {
      pipeline.setState(new PipelineSourceState(pipeline));
    });

    it("should not move to Source state, should throw error", () => {
      expect(() => {
        pipeline.moveToSource();
      }).toThrowError();
    });

    it("should not move to Build state, should throw error", () => {
      expect(() => {
        pipeline.moveToBuild();
      }).toThrowError();
    });

    it("should not move to Test state, should throw error", () => {
      expect(() => {
        pipeline.moveToTest();
      }).toThrowError();
    });

    it("should not move to Analyze state, should throw error", () => {
      expect(() => {
        pipeline.moveToAnalyze();
      }).toThrowError();
    });

    it("should not move to Deploy state, should throw error", () => {
      expect(() => {
        pipeline.moveToDeploy();
      }).toThrowError();
    });

    it("should move to Package state ", () => {
      pipeline.moveToPackage();
      expect(pipeline.getState().constructor.name).toBe("PipelinePackageState");
    });

    it("should move to Cancel state ", () => {
      pipeline.moveToCancel();
      expect(pipeline.getState().constructor.name).toBe(
        "PipelineCancelledState"
      );
    });
  });

  describe("Pipeline Package State Tests", () => {
    beforeEach(() => {
      pipeline.setState(new PipelinePackageState(pipeline));
    });

    it("should not move to Source state, should throw error", () => {
      expect(() => {
        pipeline.moveToSource();
      }).toThrowError();
    });

    it("should not move to Package state, should throw error", () => {
      expect(() => {
        pipeline.moveToPackage();
      }).toThrowError();
    });

    it("should not move to Test state, should throw error", () => {
      expect(() => {
        pipeline.moveToTest();
      }).toThrowError();
    });

    it("should not move to Analyze state, should throw error", () => {
      expect(() => {
        pipeline.moveToAnalyze();
      }).toThrowError();
    });

    it("should not move to Deploy state, should throw error", () => {
      expect(() => {
        pipeline.moveToDeploy();
      }).toThrowError();
    });

    it("should move to Build state ", () => {
      pipeline.moveToBuild();
      expect(pipeline.getState().constructor.name).toBe("PipelineBuildState");
    });

    it("should move to Cancel state ", () => {
      pipeline.moveToCancel();
      expect(pipeline.getState().constructor.name).toBe(
        "PipelineCancelledState"
      );
    });
  });

  describe("Pipeline Build State Tests", () => {
    beforeEach(() => {
      pipeline.setState(new PipelineBuildState(pipeline));
    });

    it("should not move to Source state, should throw error", () => {
      expect(() => {
        pipeline.moveToSource();
      }).toThrowError();
    });

    it("should not move to Package state, should throw error", () => {
      expect(() => {
        pipeline.moveToPackage();
      }).toThrowError();
    });

    it("should not move to Build state, should throw error", () => {
      expect(() => {
        pipeline.moveToBuild();
      }).toThrowError();
    });

    it("should not move to Analyze state, should throw error", () => {
      expect(() => {
        pipeline.moveToAnalyze();
      }).toThrowError();
    });

    it("should not move to Deploy state, should throw error", () => {
      expect(() => {
        pipeline.moveToDeploy();
      }).toThrowError();
    });

    it("should move to Test state ", () => {
      pipeline.moveToTest();
      expect(pipeline.getState().constructor.name).toBe("PipelineTestState");
    });

    it("should move to Cancel state ", () => {
      pipeline.moveToCancel();
      expect(pipeline.getState().constructor.name).toBe(
        "PipelineCancelledState"
      );
    });
  });

  describe("Pipeline Test State Tests", () => {
    beforeEach(() => {
      pipeline.setState(new PipelineTestState(pipeline));
    });

    it("should not move to Source state, should throw error", () => {
      expect(() => {
        pipeline.moveToSource();
      }).toThrowError();
    });

    it("should not move to Package state, should throw error", () => {
      expect(() => {
        pipeline.moveToPackage();
      }).toThrowError();
    });

    it("should not move to Build state, should throw error", () => {
      expect(() => {
        pipeline.moveToBuild();
      }).toThrowError();
    });

    it("should not move to Test state, should throw error", () => {
      expect(() => {
        pipeline.moveToTest();
      }).toThrowError();
    });

    it("should not move to Deploy state, should throw error", () => {
      expect(() => {
        pipeline.moveToDeploy();
      }).toThrowError();
    });

    it("should move to Analyze state ", () => {
      pipeline.moveToAnalyze();
      expect(pipeline.getState().constructor.name).toBe("PipelineAnalyzeState");
    });

    it("should move to Cancel state ", () => {
      pipeline.moveToCancel();
      expect(pipeline.getState().constructor.name).toBe(
        "PipelineCancelledState"
      );
    });
  });

  describe("Pipeline Analyze State Tests", () => {
    beforeEach(() => {
      pipeline.setState(new PipelineAnalyzeState(pipeline));
    });

    it("should not move to Source state, should throw error", () => {
      expect(() => {
        pipeline.moveToSource();
      }).toThrowError();
    });

    it("should not move to Package state, should throw error", () => {
      expect(() => {
        pipeline.moveToPackage();
      }).toThrowError();
    });

    it("should not move to Build state, should throw error", () => {
      expect(() => {
        pipeline.moveToBuild();
      }).toThrowError();
    });

    it("should not move to Test state, should throw error", () => {
      expect(() => {
        pipeline.moveToTest();
      }).toThrowError();
    });

    it("should not move to Analyze state, should throw error", () => {
      expect(() => {
        pipeline.moveToAnalyze();
      }).toThrowError();
    });

    it("should move to Deploy state ", () => {
      pipeline.moveToDeploy();
      expect(pipeline.getState().constructor.name).toBe("PipelineDeployState");
    });

    it("should move to Cancel state ", () => {
      pipeline.moveToCancel();
      expect(pipeline.getState().constructor.name).toBe(
        "PipelineCancelledState"
      );
    });
  });

  describe("Pipeline Deploy State Tests", () => {
    beforeEach(() => {
      pipeline.setState(new PipelineDeployState(pipeline));
    });

    it("should not move to Source state, should throw error", () => {
      expect(() => {
        pipeline.moveToSource();
      }).toThrowError();
    });

    it("should not move to Package state, should throw error", () => {
      expect(() => {
        pipeline.moveToPackage();
      }).toThrowError();
    });

    it("should not move to Build state, should throw error", () => {
      expect(() => {
        pipeline.moveToBuild();
      }).toThrowError();
    });

    it("should not move to Test state, should throw error", () => {
      expect(() => {
        pipeline.moveToTest();
      }).toThrowError();
    });

    it("should not move to Analyze state, should throw error", () => {
      expect(() => {
        pipeline.moveToAnalyze();
      }).toThrowError();
    });

    it("should not move to Deploy state, should throw error", () => {
      expect(() => {
        pipeline.moveToDeploy();
      }).toThrowError();
    });

    it("should move to Cancel state ", () => {
      pipeline.moveToCancel();
      expect(pipeline.getState().constructor.name).toBe(
        "PipelineCancelledState"
      );
    });
  });

  describe("Pipeline Cancel State Tests", () => {
    beforeEach(() => {
      pipeline.setState(new PipelineCancelledState(pipeline));
    });

    it("should move to Source state ", () => {
      pipeline.moveToSource();
      expect(pipeline.getState().constructor.name).toBe("PipelineSourceState");
    });

    it("should not move to Package state, should throw error", () => {
      expect(() => {
        pipeline.moveToPackage();
      }).toThrowError();
    });

    it("should not move to Build state, should throw error", () => {
      expect(() => {
        pipeline.moveToBuild();
      }).toThrowError();
    });

    it("should not move to Test state, should throw error", () => {
      expect(() => {
        pipeline.moveToTest();
      }).toThrowError();
    });

    it("should not move to Analyze state, should throw error", () => {
      expect(() => {
        pipeline.moveToAnalyze();
      }).toThrowError();
    });

    it("should not move to Deploy state, should throw error", () => {
      expect(() => {
        pipeline.moveToDeploy();
      }).toThrowError();
    });

    it("should not move to Cancel state, should throw error", () => {
      expect(() => {
        pipeline.moveToCancel();
      }).toThrowError();
    });
  });
});
