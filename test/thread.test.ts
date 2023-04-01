import { User } from "../src/models/user.model";
import { UserFactory } from "../src/factory-pattern/user-factory";
import { ScrumRole } from "../src/models/enumerations";
import { Thread } from "../src/models/thread.model";
import { ThreadMessage } from "../src/models/threadMessage";

describe("Thread Tests", () => {
  const user: User = new UserFactory().createUser(
    "Erdem",
    "Pekguzel",
    "er@d.em",
    "0612345678",
    [],
    ScrumRole.PRODUCT_OWNER
  );
  const thread: Thread = new Thread("", "", user);
  const threadMessage: ThreadMessage = new ThreadMessage("", user, []);
  const observer = { update: jest.fn() };

  it("should add a message and send a notification", () => {
    thread.subscribe(observer);
    thread.addMessage(threadMessage);

    expect(thread.getMessages()[1]).toBe(threadMessage);
    expect(observer.update).toBeCalled();
  });

  it("should remove a message", () => {
    thread.removeMessage(threadMessage);

    expect(thread.getMessages()).toHaveLength(1);
  });

  it("should unsubscribe an observer", () => {
    thread.unsubscribe(observer);

    expect(thread["_observers"]).toHaveLength(0);
  });
});