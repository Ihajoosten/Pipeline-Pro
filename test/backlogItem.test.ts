import { UserFactory } from "../src/factory-pattern/user-factory";
import { Activity } from "../src/models/activity.model";
import { BacklogItem } from "../src/models/backlogItem.model";
import { NotificationType, ScrumRole } from "../src/models/enumerations";
import { Notification } from "../src/models/notification.model";
import { Thread } from "../src/models/thread.model";
import { NotificationPreference, User } from "../src/models/user.model";
import { IObserver } from "../src/observer-pattern/interfaces/IObserver";
import { BacklogDoingState } from "../src/state-pattern/states/backlog-states/doing.state";
import { BacklogDoneState } from "../src/state-pattern/states/backlog-states/done.state";
import { BacklogReadyForTestingState } from "../src/state-pattern/states/backlog-states/readyForTesting.state";
import { BacklogTestedState } from "../src/state-pattern/states/backlog-states/tested.state";
import { BacklogTestingState } from "../src/state-pattern/states/backlog-states/testing.state";

describe("Backlog Item Path Coverage Tests", () => {
  let backlogItem: BacklogItem;
  let user: User;
  let tester: User;
  let developer: User;
  let scrumMaster: User;
  let activity: Activity;
  let thread: Thread;
  let observer: IObserver;
  let notification: Notification;

  beforeEach(() => {
    user = new UserFactory().createUser(
      "Erdem",
      "Pekguzel",
      "erdempekguzel@avans.nl",
      "0697513489",
      [],
      ScrumRole.SCRUM_MASTER
    );
    tester = new UserFactory().createUser(
      "Luc",
      "Joosten",
      "lucjoosten@gmail.com",
      "0645791584",
      [
        new NotificationPreference(
          NotificationType.EMAIL,
          "lhajoosten@avans.nl"
        ),
      ],
      ScrumRole.TESTER
    );
    developer = new UserFactory().createUser(
      "Luc",
      "Joosten",
      "lucjoosten@gmail.com",
      "0645791584",
      [
        new NotificationPreference(
          NotificationType.EMAIL,
          "lhajoosten@avans.nl"
        ),
      ],
      ScrumRole.DEVELOPER
    );
    scrumMaster = new UserFactory().createUser(
      "Luc",
      "Joosten",
      "lucjoosten@gmail.com",
      "0645791584",
      [
        new NotificationPreference(
          NotificationType.EMAIL,
          "lhajoosten@avans.nl"
        ),
      ],
      ScrumRole.SCRUM_MASTER
    );
    backlogItem = new BacklogItem(
      "BI-001",
      "Make a new Functionality",
      10,
      user,
      scrumMaster
    );
    activity = new Activity("Testing", "Testing the activity of backlog item");
    thread = new Thread("Title", "First message", user);
    observer = {
      update: jest.fn(),
    };
    notification = new Notification(user, "notification");
  });

  it("throws an error when not all activities are done", () => {
    backlogItem.addActivity(activity);
    activity._isDone = false;
    backlogItem.addActivity(activity);
    expect(() => backlogItem.done()).toThrow(
      "Not all activites are done for this backlog item"
    );
  });

  it("should set developer and tester", () => {
    backlogItem.setDeveloper(developer);
    backlogItem.setState(new BacklogReadyForTestingState(backlogItem));
    backlogItem.setTester(tester);
    expect(backlogItem.getDeveloper()).toBe(developer);
    expect(backlogItem.getTester()).toBe(tester);
  });

  it("should not set a tester and throw an error if the user is not a tester", () => {
    expect(() => {
      backlogItem.setTester(user);
    }).toThrowError();
  });

  it("should add and remove activity", () => {
    backlogItem.addActivity(activity);
    expect(backlogItem.getActivities()).toContain(activity);
    backlogItem.removeActivity(activity);
    expect(backlogItem.getActivities()).not.toContain(activity);
  });

  it("should add, get and remove thread", () => {
    backlogItem.addThread(thread);
    expect(backlogItem.getThread()).toBe(thread);
    backlogItem.removeThread();
    expect(backlogItem.getThread()).toBe(undefined);
  });

  it("should not add a thread and throw an error when a thread already exists", () => {
    backlogItem.addThread(thread);
    expect(() => {
      backlogItem.addThread(thread);
    }).toThrowError();
  });

  it("should set and get state", () => {
    backlogItem.setState(backlogItem.getState());
    expect(backlogItem.getState()).toBe(backlogItem.getState());
  });

  describe("subscribe", () => {
    it("should add an observer to the observers array", () => {
      backlogItem.subscribe(observer);
      expect(backlogItem["_observers"]).toContain(observer);
    });
  });

  describe("unsubscribe", () => {
    it("should remove an observer from the observers array", () => {
      backlogItem.subscribe(observer);
      backlogItem.unsubscribe(observer);
      expect(backlogItem["_observers"]).not.toContain(observer);
    });

    it("should not remove an observer that is not subscribed", () => {
      backlogItem.unsubscribe(observer);
      expect(backlogItem["_observers"]).toEqual([]);
    });
  });

  describe("notify", () => {
    it("should call the update method of all subscribed observers", () => {
      backlogItem.subscribe(observer);
      backlogItem.notify(notification);
      expect(observer.update).toHaveBeenCalledWith(notification);
    });

    it("should not call the update method when there are no observers", () => {
      backlogItem.notify(notification);
      expect(observer.update).not.toHaveBeenCalled();
    });
  });

  // states
  it("should not move to to-do state, should throw error", () => {
    expect(() => {
      backlogItem.toDo();
    }).toThrowError();
  });

  it("should not move to ready for testing state, should throw error", () => {
    expect(() => {
      backlogItem.readyForTesting();
    }).toThrowError();
  });

  it("should not move to testing state, should throw error", () => {
    expect(() => {
      backlogItem.testing();
    }).toThrowError();
  });

  it("should not move to tested state, should throw error", () => {
    expect(() => {
      backlogItem.tested();
    }).toThrowError();
  });

  it("should not move to done state, should throw error", () => {
    expect(() => {
      backlogItem.done();
    }).toThrowError();
  });

  it("should move to doing state", () => {
    backlogItem.doing();
    expect(backlogItem.getState().constructor.name).toBe("BacklogDoingState");
  });

  describe("Backlog Item Doing State Tests", () => {
    beforeEach(() => {
      backlogItem.setState(new BacklogDoingState(backlogItem));
    });

    it("should move to to-do state", () => {
      backlogItem.toDo();
      expect(backlogItem.getState().constructor.name).toBe("BacklogToDoState");
    });

    it("should not move to doing state, should throw error", () => {
      expect(() => {
        backlogItem.doing();
      }).toThrowError();
    });

    it("should move to ready for testing state and send a notification to the tester", () => {
      backlogItem.setTester(tester);
      backlogItem.subscribe(observer);
      backlogItem.readyForTesting();
      expect(backlogItem.getState().constructor.name).toBe(
        "BacklogReadyForTestingState"
      );
      expect(observer.update).toHaveBeenCalled();
    });

    it("should not move to testing state, should throw error", () => {
      expect(() => {
        backlogItem.testing();
      }).toThrowError();
    });

    it("should not move to tested state, should throw error", () => {
      expect(() => {
        backlogItem.tested();
      }).toThrowError();
    });

    it("should not move to done state, should throw error", () => {
      expect(() => {
        backlogItem.done();
      }).toThrowError();
    });
  });

  describe("Backlog Item ReadyForTesting State Tests", () => {
    beforeEach(() => {
      backlogItem.setState(new BacklogReadyForTestingState(backlogItem));
    });

    it("should move to to-do state", () => {
      backlogItem.toDo();
      expect(backlogItem.getState().constructor.name).toBe("BacklogToDoState");
    });

    it("should move to doing state", () => {
      backlogItem.doing();
      expect(backlogItem.getState().constructor.name).toBe("BacklogDoingState");
    });

    it("should not move to ready for testing state, should throw error", () => {
      expect(() => {
        backlogItem.readyForTesting();
      }).toThrowError();
    });

    it("should move to testing state", () => {
      backlogItem.testing();
      expect(backlogItem.getState().constructor.name).toBe(
        "BacklogTestingState"
      );
    });

    it("should not move to tested state, should throw error", () => {
      expect(() => {
        backlogItem.tested();
      }).toThrowError();
    });

    it("should not move to done state, should throw error", () => {
      expect(() => {
        backlogItem.done();
      }).toThrowError();
    });
  });

  describe("Backlog Item Testing State Tests", () => {
    beforeEach(() => {
      backlogItem.setState(new BacklogTestingState(backlogItem));
    });

    it("should not move to to-do state, should throw error", () => {
      expect(() => {
        backlogItem.toDo();
      }).toThrowError();
    });

    it("should not move to doing state, should throw error", () => {
      expect(() => {
        backlogItem.doing();
      }).toThrowError();
    });

    it("should not move to ready for testing state, should throw error", () => {
      expect(() => {
        backlogItem.readyForTesting();
      }).toThrowError();
    });

    it("should not move to testing state, should throw error", () => {
      expect(() => {
        backlogItem.testing();
      }).toThrowError();
    });

    it("should move to tested state", () => {
      backlogItem.tested();
      expect(backlogItem.getState().constructor.name).toBe(
        "BacklogTestedState"
      );
    });

    it("should not move to done state, should throw error", () => {
      expect(() => {
        backlogItem.done();
      }).toThrowError();
    });
  });

  describe("Backlog Item Tested State Tests", () => {
    beforeEach(() => {
      backlogItem.setState(new BacklogTestedState(backlogItem));
    });

    it("should move to to-do state ", () => {
      backlogItem.toDo();
      expect(backlogItem.getState().constructor.name).toBe("BacklogToDoState");
    });

    it("should not move to doing state, should throw error", () => {
      expect(() => {
        backlogItem.doing();
      }).toThrowError();
    });

    it("should move to ready for testing state ", () => {
      backlogItem.readyForTesting();
      expect(backlogItem.getState().constructor.name).toBe(
        "BacklogReadyForTestingState"
      );
    });

    it("should not move to testing state, should throw error", () => {
      expect(() => {
        backlogItem.testing();
      }).toThrowError();
    });

    it("should not move to tested state, should throw error", () => {
      expect(() => {
        backlogItem.tested();
      }).toThrowError();
    });

    it("should move to done state ", () => {
      backlogItem.done();
      expect(backlogItem.getState().constructor.name).toBe("BacklogDoneState");
    });
  });

  describe("Backlog Item Done State Tests", () => {
    beforeEach(() => {
      backlogItem.setState(new BacklogDoneState(backlogItem));
    });

    it("should not move to to-do state, should throw error", () => {
      expect(() => {
        backlogItem.toDo();
      }).toThrowError();
    });

    it("should not move to doing state, should throw error", () => {
      expect(() => {
        backlogItem.doing();
      }).toThrowError();
    });

    it("should not move to ready for testing state, should throw error", () => {
      expect(() => {
        backlogItem.readyForTesting();
      }).toThrowError();
    });

    it("should not move to testing state, should throw error", () => {
      expect(() => {
        backlogItem.testing();
      }).toThrowError();
    });

    it("should not move to tested state, should throw error", () => {
      expect(() => {
        backlogItem.tested();
      }).toThrowError();
    });

    it("should not move to done state, should throw error", () => {
      expect(() => {
        backlogItem.done();
      }).toThrowError();
    });
  });
});
