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
    backlogItem = new BacklogItem(
      "BI-001",
      "Make a new Functionality",
      "Adding new Functionality to the back-end",
      user
    );
    activity = new Activity("Testing", "Testing the activity of backlog item");
    thread = new Thread("Testing Thread", user);
    observer = {
      update: jest.fn(),
    };
    notification = new Notification(user, "test test notify");
  });

  it("should set developer and tester", () => {
    const developer = new UserFactory().createUser(
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
    const tester = new UserFactory().createUser(
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

    backlogItem.setDeveloper(developer);
    backlogItem.setState(new BacklogReadyForTestingState(backlogItem));
    backlogItem.setTester(developer, tester);

    expect(backlogItem.getDeveloper()).toBe(developer);
    expect(backlogItem.getTester()).toBe(tester);
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

  it("should set and get state", () => {
    backlogItem.setState(backlogItem.getState());
    expect(backlogItem.getState()).toBe(backlogItem.getState());
  });

  describe("subscribe", () => {
    it("should add an observer to the observers array", () => {
      backlogItem.subscribe(observer);
      expect(backlogItem["observers"]).toContain(observer);
    });
  });

  describe("unsubscribe", () => {
    it("should remove an observer from the observers array", () => {
      backlogItem.subscribe(observer);
      backlogItem.unsubscribe(observer);
      expect(backlogItem["observers"]).not.toContain(observer);
    });

    it("should not remove an observer that is not subscribed", () => {
      backlogItem.unsubscribe(observer);
      expect(backlogItem["observers"]).toEqual([]);
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
});

describe("Backlog Item Doing State Tests", () => {
  let backlogItem: BacklogItem;
  let user: User;

  beforeEach(() => {
    user = new UserFactory().createUser(
      "Luc",
      "Joosten",
      "lucjoosten@gmail.com",
      "0634978124",
      [new NotificationPreference(NotificationType.SLACK, "lucjoosten@gmail.com")],
      ScrumRole.SCRUM_MASTER
    );
    backlogItem = new BacklogItem(
      "BI-001",
      "Make a new Functionality",
      "Adding new Functionality to the back-end",
      user
    );
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

  it("should move to ready for testing state", () => {
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

  it("should not move to done state, should throw error", () => {
    expect(() => {
      backlogItem.done();
    }).toThrowError();
  });
});

describe("Backlog Item ReadyForTesting State Tests", () => {
  let backlogItem: BacklogItem;
  let user: User;

  beforeEach(() => {
    user = new UserFactory().createUser(
      "Luc",
      "Joosten",
      "lucjoosten@gmail.com",
      "0634978124",
      [new NotificationPreference(NotificationType.SLACK, "lucjoosten@gmail.com")],
      ScrumRole.SCRUM_MASTER
    );

    backlogItem = new BacklogItem(
      "BI-001",
      "Make a new Functionality",
      "Adding new Functionality to the back-end",
      user
    );
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
    expect(backlogItem.getState().constructor.name).toBe("BacklogTestingState");
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
  let backlogItem: BacklogItem;
  let user: User;

  beforeEach(() => {
    user = new UserFactory().createUser(
      "Luc",
      "Joosten",
      "lucjoosten@gmail.com",
      "0634978124",
      [new NotificationPreference(NotificationType.SLACK, "lucjoosten@gmail.com")],
      ScrumRole.SCRUM_MASTER
    );

    backlogItem = new BacklogItem(
      "BI-001",
      "Make a new Functionality",
      "Adding new Functionality to the back-end",
      user
    );
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
    expect(backlogItem.getState().constructor.name).toBe("BacklogTestedState");
  });

  it("should not move to done state, should throw error", () => {
    expect(() => {
      backlogItem.done();
    }).toThrowError();
  });
});

describe("Backlog Item Tested State Tests", () => {
  let backlogItem: BacklogItem;
  let user: User;

  beforeEach(() => {
    user = new UserFactory().createUser(
      "Luc",
      "Joosten",
      "lucjoosten@gmail.com",
      "0634978124",
      [new NotificationPreference(NotificationType.SLACK, "lucjoosten@gmail.com")],
      ScrumRole.SCRUM_MASTER
    );

    backlogItem = new BacklogItem(
      "BI-001",
      "Make a new Functionality",
      "Adding new Functionality to the back-end",
      user
    );
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
  let backlogItem: BacklogItem;
  let user: User;

  beforeEach(() => {
    user = new UserFactory().createUser(
      "Luc",
      "Joosten",
      "lucjoosten@gmail.com",
      "0634978124",
      [new NotificationPreference(NotificationType.SLACK, "lucjoosten@gmail.com")],
      ScrumRole.SCRUM_MASTER
    );

    backlogItem = new BacklogItem(
      "BI-001",
      "Make a new Functionality",
      "Adding new Functionality to the back-end",
      user
    );
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
