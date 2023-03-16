import { UserFactory } from "../src/factory-pattern/user-factory";
import { NotificationType, ScrumRole } from "../src/models/enumerations";
import { NotificationPreference } from "../src/models/notification.model";
import { User } from "../src/models/user.model";

describe("User", () => {
  let user: User;
  beforeEach(() => {
    user = new UserFactory().createUser(
      "Erdem",
      "Pekguzel",
      "lhajoost@avans.nl",
      "0637916452",
      new Array<NotificationPreference>(),
      ScrumRole.DEVELOPER
    );
  });

  describe("constructor", () => {
    it("should create a user with notification preference", () => {
      user.addNotificationPreference(
        NotificationType.SLACK,
        "lhajoost@avans.nl"
      );

      expect(user.getFirstName()).toEqual("Erdem");
      expect(user.getLastName()).toEqual("Pekguzel");
      expect(user.getEmail()).toEqual("lhajoost@avans.nl");
      expect(user.getPhoneNumber()).toEqual("0637916452");
      expect(user.getRole()).toEqual(ScrumRole.DEVELOPER);
      expect(user.getNotificationPreferences()).toEqual([
        { _type: NotificationType.SLACK, _address: "lhajoost@avans.nl" },
      ]);
    });

    it("should create a user without notification preference", () => {
      expect(user.getFirstName()).toEqual("Erdem");
      expect(user.getLastName()).toEqual("Pekguzel");
      expect(user.getEmail()).toEqual("lhajoost@avans.nl");
      expect(user.getPhoneNumber()).toEqual("0637916452");
      expect(user.getRole()).toEqual(ScrumRole.DEVELOPER);
      expect(user.getNotificationPreferences()).toEqual([]);
    });
  });

  describe("setters", () => {
    it("should update user information", () => {
      const user = new UserFactory().createUser(
        "Erdem",
        "Pekguzel",
        "lhajoost@avans.nl",
        "0637916452",
        new Array<NotificationPreference>(),
        ScrumRole.DEVELOPER
      );

      user.setFirstName("Jane");
      expect(user.getFirstName()).toEqual("Jane");

      user.setLastName("Pekguzel");
      expect(user.getLastName()).toEqual("Pekguzel");

      user.setEmail("jane.Pekguzel@test.com");
      expect(user.getEmail()).toEqual("jane.Pekguzel@test.com");

      user.setPhoneNumber("0679432596");
      expect(user.getPhoneNumber()).toEqual("0679432596");
    });
  });

  describe("addNotificationPreference", () => {
    it("should add a notification preference", () => {
      user.addNotificationPreference(
        NotificationType.EMAIL,
        "lhajoost@avans.nl"
      );
      user.addNotificationPreference(
        NotificationType.SLACK,
        "lhajoost@avans.nl"
      );
      expect(user.getNotificationPreferences()).toEqual([
        { _type: NotificationType.EMAIL, _address: "lhajoost@avans.nl" },
        { _type: NotificationType.SLACK, _address: "lhajoost@avans.nl" },
      ]);
    });
  });

  describe("removeNotificationPreference", () => {
    it("should remove a notification preference", () => {
      console.warn(
        "SHOULD HAVE EMPTY ARRAY: " + user.getNotificationPreferences()
      );

      user.addNotificationPreference(
        NotificationType.EMAIL,
        "lhajoost@avans.nl"
      );
      user.addNotificationPreference(
        NotificationType.SLACK,
        "lhajoost@avans.nl"
      );

      console.warn(
        "SHOULD HAVE TWO ITEMS IN ARRAY: " + user.getNotificationPreferences()
      );
      let notificationPreference = new NotificationPreference(
        NotificationType.EMAIL,
        "lhajoost@avans.nl"
      );
      user.removeNotificationPreference(notificationPreference);

      console.warn(
        "SHOULD HAVE ONE ITEM IN ARRAY: " + user.getNotificationPreferences()
      );
      expect(user.getNotificationPreferences().length).toEqual(1);
    });
  });
});
