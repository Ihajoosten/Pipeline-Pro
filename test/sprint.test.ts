import { UserFactory } from "../src/factory-pattern/user-factory";
import { BacklogItem } from "../src/models/backlogItem.model";
import { NotificationType, ScrumRole } from "../src/models/enumerations";
import { Notification } from "../src/models/notification.model";
import { Pipeline } from "../src/models/pipeline.model";
import { Sprint } from "../src/models/sprint.model";
import { NotificationPreference, User } from "../src/models/user.model";
import { IObserver } from "../src/observer-pattern/interfaces/IObserver";
import { BacklogDoneState } from "../src/state-pattern/states/backlog-states/done.state";
import { SprintActiveState } from "../src/state-pattern/states/sprint-states/active.state";
import { SprintCancelReleaseState } from "../src/state-pattern/states/sprint-states/canceled.state";
import { SprintClosedState } from "../src/state-pattern/states/sprint-states/closed.state";
import { SprintFinishedState } from "../src/state-pattern/states/sprint-states/finished.state";
import { SprintReleasedState } from "../src/state-pattern/states/sprint-states/released.state";
import { SprintReviewedState } from "../src/state-pattern/states/sprint-states/reviewed.state";

describe("Sprint", () => {
  let sprint: Sprint;
  let scrumMaster: User;
  let productOwner: User;
  let developer: User;
  let leadDeveloper: User;
  let backlogItem: BacklogItem;
  let pipeline: Pipeline;
  let observer: IObserver;
  let notification: Notification

  beforeEach(() => {
    scrumMaster = new UserFactory().createUser(
      "Luc",
      "Joosten",
      "lhajoost@avans.nl",
      "0645791584",
      [
        new NotificationPreference(
          NotificationType.EMAIL,
          "lhajoosten@avans.nl"
        ),
      ],
      ScrumRole.SCRUM_MASTER
    );
    productOwner = new UserFactory().createUser(
      "Luc",
      "Joosten",
      "lhajoost@avans.nl",
      "0645791584",
      [
        new NotificationPreference(
          NotificationType.EMAIL,
          "lhajoosten@avans.nl"
        ),
      ],
      ScrumRole.PRODUCT_OWNER
    );
    developer = new UserFactory().createUser(
      "Luc",
      "Joosten",
      "lhajoost@avans.nl",
      "0645791584",
      [
        new NotificationPreference(
          NotificationType.EMAIL,
          "lhajoosten@avans.nl"
        ),
      ],
      ScrumRole.DEVELOPER
    );
    leadDeveloper = new UserFactory().createUser(
      "Luc",
      "Joosten",
      "lhajoost@avans.nl",
      "0645791584",
      [
        new NotificationPreference(
          NotificationType.EMAIL,
          "lhajoosten@avans.nl"
        ),
      ],
      ScrumRole.LEAD_DEVELOPER
    );
    backlogItem = new BacklogItem(
      "BI-001",
      "Make a new Functionality",
      5,
      developer,
      scrumMaster
    );
    backlogItem.setState(new BacklogDoneState(backlogItem));
    pipeline = new Pipeline("Sprint 1", productOwner, scrumMaster);
    sprint = new Sprint(
      "",
      new Date(),
      new Date(),
      developer,
      productOwner,
      scrumMaster,
      pipeline
    );
    observer = {
      update: jest.fn(),
    };
    notification = new Notification(scrumMaster, "notification", 'test');
    sprint.addBacklogItem(leadDeveloper, backlogItem);
  });

  describe("constructor", () => {
    it("should throw an error if the scrum master is not valid", () => {
      expect(() => {
        new Sprint(
          "",
          new Date(),
          new Date(),
          scrumMaster,
          productOwner,
          developer,
          pipeline
        );
      }).toThrowError("Invalid scrum master!");
    });

    it("should set the initial state to SprintCreatedState", () => {
      expect(sprint["_state"].constructor.name).toBe("SprintCreatedState");
    });
  });

  describe("addBacklogItem", () => {
    it("should add a new backlog item to the backlog items array", () => {
      sprint.addBacklogItem(leadDeveloper, backlogItem);
      expect(sprint.getBacklogItems().length).toBe(2);
      expect(sprint.getBacklogItems()[1]._name).toBe(backlogItem._name);
      expect(sprint.getBacklogItems()[1]._description).toBe(
        backlogItem._description
      );
    });

    it("should not add a new backlog item and throw an error if the user is not a lead developer", () => {
      expect(() => {
        sprint.addBacklogItem(developer, backlogItem);
      }).toThrowError();
    });
  });

  describe("removeBacklogItem", () => {
    it("should remove a backlog item from the backlog items array", () => {
      sprint.removeBacklogItem(leadDeveloper, sprint.getBacklogItems()[0]);
      expect(sprint.getBacklogItems().length).toBe(0);
    });

    it("should not remove a backlog item and throw an error if the user is not a lead developer", () => {
      expect(() => {
        sprint.removeBacklogItem(developer, backlogItem);
      }).toThrowError();
    });
  });

  describe("updateSprint", () => {
    it("should update sprint with new details when sprint is in created state", () => {
      jest.resetAllMocks();
      sprint.updateSprint(
        "New Sprint Name",
        new Date("2023-04-02"),
        new Date("2023-04-15"),
        scrumMaster,
        pipeline
      );

      expect(sprint._name).toEqual("New Sprint Name");
      expect(sprint._startDate).toEqual(new Date("2023-04-02"));
      expect(sprint._endDate).toEqual(new Date("2023-04-15"));
      expect(sprint.getScrumMaster().getFirstName()).toEqual("Luc");
    });

    it("should not update a sprint and throw an error when the pipeline is running", () => {
      const pipelineMock = require("../src/models/pipeline.model")
        .default as jest.MockedClass<typeof Pipeline>;
      jest.doMock("../src/models/pipeline.model", () => {
        return {
          default: jest.fn().mockImplementation(() => {
            return {
              isRunning: jest.fn().mockReturnValue(true),
            };
          }) as jest.MockedClass<typeof Pipeline>,
        };
      });

      expect(() => {
        sprint.updateSprint(
          "New Sprint Name",
          new Date("2023-04-02"),
          new Date("2023-04-15"),
          scrumMaster,
          new pipelineMock("", productOwner, scrumMaster)
        );
      }).toThrowError();
    });

    it('Should throw error when sprint is already started', () => {
      sprint.setState(new SprintActiveState(sprint));
      expect(() => {
        sprint.updateSprint(
          "New Sprint Name",
          new Date("2023-04-02"),
          new Date("2023-04-15"),
          scrumMaster,
          pipeline
        );
      }).toThrowError();
    })
  });

  describe("subscribe", () => {
    it("should add an observer to the observers array", () => {
      sprint.subscribe(observer);
      expect(sprint["_observers"]).toContain(observer);
    });
  });

  describe("unsubscribe", () => {
    it("should remove an observer from the observers array", () => {
      sprint.subscribe(observer);
      sprint.unsubscribe(observer);
      expect(sprint["_observers"]).not.toContain(observer);
    });

    it("should not remove an observer that is not subscribed", () => {
      sprint.unsubscribe(observer);
      expect(sprint["_observers"]).toEqual([]);
    });
  });

  describe("notify", () => {
    it("should call the update method of all subscribed observers", () => {
      sprint.subscribe(observer);
      sprint.notify(notification);
      expect(observer.update).toHaveBeenCalledWith(notification);
    });

    it("should not call the update method when there are no observers", () => {
      backlogItem.notify(notification);
      expect(observer.update).not.toHaveBeenCalled();
    });
  });

  describe("Check Role", () => {
    it("should not update sprint when sprint is in active state", () => {
      sprint.setState(new SprintActiveState(sprint));

      expect(() =>
        sprint.updateSprint(
          "New Sprint Name",
          new Date("2023-04-02"),
          new Date("2023-04-15"),
          scrumMaster,
          pipeline
        )
      ).toThrowError("Cannot update sprint because it has already started!");
    });

    it("should not start sprint when called by non-scrum master user", () => {
      expect(() => sprint.start(developer)).toThrowError(
        "Only the scrum master can perform this action!"
      );
    });

    it("should not finish sprint when called by non-scrum master user", () => {
      expect(() => sprint.finish(developer)).toThrowError(
        "Only the scrum master can perform this action!"
      );
    });

    it("should not release sprint when called by non-scrum master user", () => {
      expect(() => sprint.release(developer)).toThrowError(
        "Only the scrum master can perform this action!"
      );
    });

    it("should not review sprint when called by non-scrum master user", () => {
      expect(() => sprint.review(developer)).toThrowError(
        "Only the scrum master can perform this action!"
      );
    });

    it("should not close sprint when called by non-scrum master user", () => {
      expect(() => sprint.close(developer)).toThrowError(
        "Only the scrum master can perform this action!"
      );
    });
    it("should not move to CancelRelease state, should throw error", () => {
      expect(() => {
        sprint.cancelRelease(scrumMaster);
      }).toThrowError();
    });
  });

  describe("Sprint Created State Tests", () => {
    it("should not move to Created state, should throw error", () => {
      expect(() => {
        sprint.create(scrumMaster);
      }).toThrowError();
    });

    it("should move to Active state", () => {
      sprint.start(scrumMaster);
      expect(sprint.getState().constructor.name).toBe("SprintActiveState");
    });

    it("should not move to Finshed state, should throw error", () => {
      expect(() => {
        sprint.finish(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Released state, should throw error", () => {
      expect(() => {
        sprint.release(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Reviewed state, should throw error", () => {
      expect(() => {
        sprint.review(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Closed state, should throw error", () => {
      expect(() => {
        sprint.close(scrumMaster);
      }).toThrowError();
    });
    it("should not move to CancelRelease state, should throw error", () => {
      expect(() => {
        sprint.cancelRelease(scrumMaster);
      }).toThrowError();
    });
  });

  describe("Sprint Active State Tests", () => {
    beforeEach(() => {
      sprint.start(scrumMaster);
    });

    it("should not move to Created state, should throw error", () => {
      expect(() => {
        sprint.create(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Active state, should throw error", () => {
      expect(() => {
        sprint.start(scrumMaster);
      }).toThrowError();
    });

    it("should move to Finshed state", () => {
      sprint.finish(scrumMaster);
      expect(sprint.getState().constructor.name).toBe("SprintFinishedState");
    });

    it("should not move to Released state, should throw error", () => {
      expect(() => {
        sprint.release(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Reviewed state, should throw error", () => {
      expect(() => {
        sprint.review(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Closed state, should throw error", () => {
      expect(() => {
        sprint.close(scrumMaster);
      }).toThrowError();
    });
    it("should not move to CancelRelease state, should throw error", () => {
      expect(() => {
        sprint.cancelRelease(scrumMaster);
      }).toThrowError();
    });
  });

  describe("Sprint Finished State Tests", () => {
    beforeEach(() => {
      sprint.setState(new SprintFinishedState(sprint));
    });

    it("should not move to Created state, should throw error", () => {
      expect(() => {
        sprint.create(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Active state, should throw error", () => {
      expect(() => {
        sprint.start(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Finshed state, should throw error", () => {
      expect(() => {
        sprint.finish(scrumMaster);
      }).toThrowError();
    });

    it("should move to Released state", () => {
      sprint.release(scrumMaster);
      expect(sprint.getState().constructor.name).toBe("SprintReleasedState");
    });

    it("should move to Reviewed state", () => {
      sprint.review(scrumMaster);
      expect(sprint.getState().constructor.name).toBe("SprintReviewedState");
    });

    it("should not move to Closed state, should throw error", () => {
      expect(() => {
        sprint.close(scrumMaster);
      }).toThrowError();
    });

    it("should not move to CancelRelease state, should throw error", () => {
      expect(() => {
        sprint.cancelRelease(scrumMaster);
      }).toThrowError();
    });
  });

  describe("Sprint Released State Tests", () => {
    beforeEach(() => {
      sprint.setState(new SprintReleasedState(sprint));
    });

    it("should not move to Created state, should throw error", () => {
      expect(() => {
        sprint.create(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Active state, should throw error", () => {
      expect(() => {
        sprint.start(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Finshed state, should throw error", () => {
      expect(() => {
        sprint.finish(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Released state, should throw error", () => {
      expect(() => {
        sprint.release(scrumMaster);
      }).toThrowError();
    });

    it("should move to Reviewed state", () => {
      sprint.review(scrumMaster);
      expect(sprint.getState().constructor.name).toBe("SprintReviewedState");
    });

    it("should not move to Closed state, should throw error", () => {
      expect(() => {
        sprint.close(scrumMaster);
      }).toThrowError();
    });
    it("should move to CancelReview state", () => {
      sprint.cancelRelease(scrumMaster);
      expect(sprint.getState().constructor.name).toBe("SprintCancelReleaseState");
    });
  });

  describe("Sprint Review State Tests", () => {
    beforeEach(() => {
      sprint.setState(new SprintReviewedState(sprint));
    });

    it("should not move to Created state, should throw error", () => {
      expect(() => {
        sprint.create(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Active state, should throw error", () => {
      expect(() => {
        sprint.start(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Finshed state, should throw error", () => {
      expect(() => {
        sprint.finish(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Released state, should throw error", () => {
      expect(() => {
        sprint.release(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Review state, should throw error", () => {
      expect(() => {
        sprint.review(scrumMaster);
      }).toThrowError();
    });

    it("should move to Closed state", () => {
      sprint.close(scrumMaster);
      expect(sprint.getState().constructor.name).toBe("SprintClosedState");
    });

    it("should not move to CancelRelease state, should throw error", () => {
      expect(() => {
        sprint.cancelRelease(scrumMaster);
      }).toThrowError();
    });
  });

  describe("Sprint Closed State Tests", () => {
    beforeEach(() => {
      sprint.setState(new SprintClosedState(sprint));
    });

    it("should not move to Created state, should throw error", () => {
      expect(() => {
        sprint.create(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Active state, should throw error", () => {
      expect(() => {
        sprint.start(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Finshed state, should throw error", () => {
      expect(() => {
        sprint.finish(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Released state, should throw error", () => {
      expect(() => {
        sprint.release(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Review state, should throw error", () => {
      expect(() => {
        sprint.review(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Close state, should throw error", () => {
      expect(() => {
        sprint.close(scrumMaster);
      }).toThrowError();
    });
    it("should not move to CancelRelease state, should throw error", () => {
      expect(() => {
        sprint.cancelRelease(scrumMaster);
      }).toThrowError();
    });
  });

  describe("Sprint Canceled Release State Tests", () => {
    beforeEach(() => {
      sprint.setState(new SprintCancelReleaseState(sprint));
    });

    it("should not move to Created state, should throw error", () => {
      expect(() => {
        sprint.create(scrumMaster);
      }).toThrowError();
    });

    it("should move to Active state", () => {
      sprint.start(scrumMaster);
      expect(sprint.getState().constructor.name).toBe("SprintActiveState");
    });

    it("should not move to Finshed state, should throw error", () => {
      expect(() => {
        sprint.finish(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Released state, should throw error", () => {
      expect(() => {
        sprint.release(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Reviewed state, should throw error", () => {
      expect(() => {
        sprint.review(scrumMaster);
      }).toThrowError();
    });

    it("should not move to Closed state, should throw error", () => {
      expect(() => {
        sprint.close(scrumMaster);
      }).toThrowError();
    });

    it("should not move to CancelRelease state, should throw error", () => {
      expect(() => {
        sprint.cancelRelease(scrumMaster);
      }).toThrowError();
    });
  });
});
