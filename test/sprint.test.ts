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

describe.only('Sprint', () => {
  let sprint: Sprint;
  let scrumMaster: User;
  let productOwner: User;
  let developer: User;
  let backlogItem: Omit<BacklogItem, "scrumMaster">;
  let pipeline: Pipeline

  beforeEach(() => {
    scrumMaster = new User('Luc', 'lhajoost@avans.nl', ScrumRole.SCRUM_MASTER, [new NotificationPreference(NotificationType.SLACK, 'lhajoost@avans.nl')]);
    productOwner = new User('Luc', 'lhajoost@avans.nl', ScrumRole.PRODUCT_OWNER, [new NotificationPreference(NotificationType.SLACK, 'lhajoost@avans.nl')]);
    developer = new User('Luc', 'lhajoost@avans.nl', ScrumRole.DEVELOPER, [new NotificationPreference(NotificationType.SLACK, 'lhajoost@avans.nl')]);
    backlogItem = new BacklogItem('BI-001', 'Make a new Functionality', 'Adding new Functionality to the back-end', scrumMaster);
    sprint = new Sprint("Sprint 1", new Date(), new Date(), scrumMaster, new Pipeline('Test', scrumMaster));
    pipeline = new Pipeline('test', scrumMaster);
  });

  describe('constructor', () => {
    it('should throw an error if the scrum master is not valid', () => {
      expect(() => {
        new Sprint("Sprint 2", new Date(), new Date(), productOwner, new Pipeline('development', productOwner));
      }).toThrowError("Invalid scrum master!");
    });

    it('should set the initial state to SprintCreatedState', () => {
      expect(sprint['sprintState'].constructor.name).toBe('SprintCreatedState');
    });
  });

  describe('getName', () => {
    it('should return the name of the sprint', () => {
      expect(sprint.getName()).toBe("Sprint 1");
    });
  });

  describe('getStartDate', () => {
    it('should return the start date of the sprint', () => {
      expect(sprint.getStartDate()).toBeInstanceOf(Date);
    });
  });

  describe('getEndDate', () => {
    it('should return the end date of the sprint', () => {
      expect(sprint.getEndDate()).toBeInstanceOf(Date);
    });
  });

  describe('getScrumMaster', () => {
    it('should return the scrum master of the sprint', () => {
      expect(sprint.getScrumMaster()).toBe(scrumMaster);
    });
  });

  describe('addBacklogItem', () => {
    it('should add a new backlog item to the backlog items array', () => {
      sprint.addBacklogItem(backlogItem);
      expect(sprint.getBacklogItems().length).toBe(1);
      expect(sprint.getBacklogItems()[0].getName()).toBe(backlogItem.name);
      expect(sprint.getBacklogItems()[0].getDescription()).toBe(backlogItem.description);
    });
  });

  describe('getBacklogItems', () => {
    it('should return the backlog items array', () => {
      expect(sprint.getBacklogItems()).toBeInstanceOf(Array);
    });
  });

  describe('removeBacklogItem', () => {
    it('should remove a backlog item from the backlog items array', () => {
      sprint.addBacklogItem(backlogItem);
      sprint.removeBacklogItem(sprint.getBacklogItems()[0]);
      expect(sprint.getBacklogItems().length).toBe(0);
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
    expect(sprint.getScrumMaster().name).toEqual("Luc");
  });

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