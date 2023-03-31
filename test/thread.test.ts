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

describe('ThreadMessage', () => {
  const user: User = new UserFactory().createUser(
    "Erdem",
    "Pekguzel",
    "er@d.em",
    "0612345678",
    [],
    ScrumRole.PRODUCT_OWNER
  );
  let threadMessages = [new ThreadMessage('First message', user, []),
  new ThreadMessage('Second message', user, []),
  ];

  describe('constructor', () => {
    it('should create a new ThreadMessage instance', () => {
      const message = 'Hello world';
      const threadMessage = new ThreadMessage(message, user, threadMessages);

      expect(threadMessage).toBeInstanceOf(ThreadMessage);
      expect(threadMessage.getMessage()).toBe(message);
      expect(threadMessage.getThreadMessages()).toEqual(threadMessages);
    });
  });

  describe('addThreadMessageToThreadMessage', () => {
    it('should add a new ThreadMessage to the thread messages array', () => {
      const message = 'New message';
      const threadMessage = new ThreadMessage('Hello world', user, []);

      threadMessage.addThreadMessageToThreadMessage(new ThreadMessage(message, user, []));
      expect(threadMessage.getThreadMessages().length).toBe(1);
      expect(threadMessage.getThreadMessages()[0].getMessage()).toBe(message);
    });

    it('should not add a new ThreadMessage if threadMessages is undefined', () => {
      const message = 'New message';
      const threadMessage = new ThreadMessage('Hello world', user, []);

      threadMessage.addThreadMessageToThreadMessage(new ThreadMessage(message, user, []));
      expect(threadMessage.getThreadMessages().length).toBe(1);
    });
  });

  describe('removeMessage', () => {
    it('should remove a ThreadMessage from the thread messages array', () => {
      let threadMessagess = [new ThreadMessage('First message', user, []),
      new ThreadMessage('Second message', user, []),
      ];
      const threadMessage = new ThreadMessage('Hello world', user, threadMessagess);
      const messageToRemove = threadMessages[0];

      threadMessage.removeMessage(messageToRemove);
      expect(threadMessage.getThreadMessages().length).toBe(2);
    });

    it('should not remove a ThreadMessage if it is not in the thread messages array', () => {
      let threadMessagess = [new ThreadMessage('First message', user, []),
      new ThreadMessage('Second message', user, []),
      ];
      const threadMessage = new ThreadMessage('Hello world', user, threadMessagess);
      const messageToRemove = new ThreadMessage('New message', user, []);

      threadMessage.removeMessage(messageToRemove);
      expect(threadMessage.getThreadMessages().length).toBe(2);
    });

    it('should not remove a ThreadMessage if threadMessages is undefined', () => {
      const threadMessage = new ThreadMessage('Hello world', user, []);
      const messageToRemove = new ThreadMessage('New message', user, []);

      threadMessage.removeMessage(messageToRemove);
      expect(threadMessage.getThreadMessages().length).toBe(0);
    });
  });

  describe('getThreadMessages', () => {
    it('should return an empty array if threadMessages is undefined', () => {
      const threadMessage = new ThreadMessage('Hello world', user, []);

      expect(threadMessage.getThreadMessages().length).toBe(0);
    });
  });
});
