import { UserFactory } from "../src/factory-pattern/user-factory";
import { BacklogItem } from "../src/models/backlogItem.model";
import { NotificationType, ScrumRole } from "../src/models/enumerations";
import { Pipeline } from "../src/models/pipeline.model";
import { Sprint } from "../src/models/sprint.model";
import { NotificationPreference, User } from "../src/models/user.model";
import { SprintActiveState } from "../src/state-pattern/states/sprint-states/active.state";
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
      "Adding new Functionality to the back-end",
      scrumMaster
    );
    pipeline = new Pipeline("Sprint 1", scrumMaster);
    sprint = new Sprint(
      112,
      "Sprint 1",
      new Date(),
      new Date(),
      scrumMaster,
      pipeline
    );
  });

  describe("constructor", () => {
    it("should throw an error if the scrum master is not valid", () => {
      expect(() => {
        new Sprint(
          112,
          "Sprint 1",
          new Date(),
          new Date(),
          productOwner,
          pipeline
        );
      }).toThrowError("Invalid scrum master!");
    });

    it("should set the initial state to SprintCreatedState", () => {
      expect(sprint["_state"].constructor.name).toBe("SprintCreatedState");
    });
  });

  describe("getName", () => {
    it("should return the name of the sprint", () => {
      expect(sprint.getName()).toBe("Sprint 1");
    });
  });

  describe("getStartDate", () => {
    it("should return the start date of the sprint", () => {
      expect(sprint.getStartDate()).toBeInstanceOf(Date);
    });
  });

  describe("getEndDate", () => {
    it("should return the end date of the sprint", () => {
      expect(sprint.getEndDate()).toBeInstanceOf(Date);
    });
  });

  describe("getScrumMaster", () => {
    it("should return the scrum master of the sprint", () => {
      expect(sprint.getScrumMaster()).toBe(scrumMaster);
    });
  });

  describe("addBacklogItem", () => {
    it("should add a new backlog item to the backlog items array", () => {
      sprint.addBacklogItem(leadDeveloper, backlogItem);
      expect(sprint.getBacklogItems().length).toBe(1);
      expect(sprint.getBacklogItems()[0].getName()).toBe(backlogItem.name);
      expect(sprint.getBacklogItems()[0].getDescription()).toBe(
        backlogItem.description
      );
    });

    it("should not add a new backlog item and throw an error if the user is not a lead developer", () => {
      expect(() => {
        sprint.addBacklogItem(developer, backlogItem);
      }).toThrowError();
    });
  });

  describe("getBacklogItems", () => {
    it("should return the backlog items array", () => {
      expect(sprint.getBacklogItems()).toBeInstanceOf(Array);
    });
  });

  describe("removeBacklogItem", () => {
    it("should remove a backlog item from the backlog items array", () => {
      sprint.addBacklogItem(leadDeveloper, backlogItem);
      sprint.removeBacklogItem(leadDeveloper, sprint.getBacklogItems()[0]);
      expect(sprint.getBacklogItems().length).toBe(0);
    });

    it("should not remove a backlog item and throw an error if the user is not a lead developer", () => {
      expect(() => {
        sprint.removeBacklogItem(developer, backlogItem);
      }).toThrowError();
    });
  });

  it("should update sprint with new details when sprint is in created state", () => {
    sprint.updateSprint(
      "New Sprint Name",
      new Date("2023-04-02"),
      new Date("2023-04-15"),
      scrumMaster,
      pipeline
    );

    expect(sprint.getName()).toEqual("New Sprint Name");
    expect(sprint.getStartDate()).toEqual(new Date("2023-04-02"));
    expect(sprint.getEndDate()).toEqual(new Date("2023-04-15"));
    expect(sprint.getScrumMaster().getFirstName()).toEqual("Luc");
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
      ).toThrowError("Cannot update Sprint because it has already started!");
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
  });
});
