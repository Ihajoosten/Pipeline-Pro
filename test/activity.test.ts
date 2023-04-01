import { UserFactory } from "../src/factory-pattern/user-factory";
import { Activity } from "../src/models/activity.model";
import { ScrumRole } from "../src/models/enumerations";
import { User } from "../src/models/user.model";

describe("Activity Tests", () => {
  const activity: Activity = new Activity("", "");
  const user: User = new UserFactory().createUser(
    "Erdem",
    "Pekguzel",
    "er@d.em",
    "0612345678",
    [],
    ScrumRole.LEAD_DEVELOPER
  );

  it("should set a (lead)developer", () => {
    activity.setDeveloper(user);
    expect(activity.getDeveloper()).toBe(user);
  });

  it("should remove a (lead)developer", () => {
    activity.setDeveloper(user);
    activity.removeDeveloper();
    expect(activity.getDeveloper()).not.toBe(user);
    expect(activity['_developer']).toEqual(undefined);
  });
});
