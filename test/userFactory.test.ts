import { UserFactory } from "../src/factory-pattern/user-factory";
import { NotificationType, ScrumRole } from "../src/models/enumerations";
import { NotificationPreference } from "../src/models/notification.model";
import {
  ProductOwner,
  ScrumMaster,
  Developer,
  LeadDeveloper,
  Tester,
} from "../src/models/user.model";

describe("UserFactory", () => {
  const factory = new UserFactory();

  describe("createUser", () => {
    it("should create a ProductOwner instance", () => {
      const user = factory.createUser(
        "erdem",
        "Doe",
        "erdemjoosten@gmail.com",
        "0637916452",
        [
          new NotificationPreference(
            NotificationType.EMAIL,
            "erdemjoosten@gmail.com"
          ),
        ],
        ScrumRole.PRODUCT_OWNER
      );
      expect(user).toBeInstanceOf(ProductOwner);
    });

    it("should create a ScrumMaster instance", () => {
      const user = factory.createUser(
        "luc",
        "Doe",
        "lucjoosten@gmail.com",
        "0637916452",
        [
          new NotificationPreference(
            NotificationType.EMAIL,
            "erdemjoosten@gmail.com"
          ),
        ],
        ScrumRole.SCRUM_MASTER
      );
      expect(user).toBeInstanceOf(ScrumMaster);
    });

    it("should create a Developer instance", () => {
      const user = factory.createUser(
        "erdem",
        "Smith",
        "erdem.smith@example.com",
        "0637916452",
        [
          new NotificationPreference(
            NotificationType.SLACK,
            "erdemjoosten@gmail.com"
          ),
        ],
        ScrumRole.DEVELOPER
      );
      expect(user).toBeInstanceOf(Developer);
    });

    it("should create a LeadDeveloper instance", () => {
      const user = factory.createUser(
        "luc",
        "Smith",
        "luc.smith@example.com",
        "0637916452",
        [
          new NotificationPreference(
            NotificationType.EMAIL,
            "erdemjoosten@gmail.com"
          ),
        ],
        ScrumRole.LEAD_DEVELOPER
      );
      expect(user).toBeInstanceOf(LeadDeveloper);
    });

    it("should create a Tester instance", () => {
      const user = factory.createUser(
        "erdem",
        "erdemson",
        "erdem.erdemson@example.com",
        "0637916452",
        [
          new NotificationPreference(
            NotificationType.EMAIL,
            "erdemjoosten@gmail.com"
          ),
        ],
        ScrumRole.TESTER
      );
      expect(user).toBeInstanceOf(Tester);
    });

    it("should throw an error for invalid first name", () => {
      expect(() => {
        factory.createUser(
          "",
          "Doe",
          "erdemjoosten@gmail.com",
          "0637916452",
          [
            new NotificationPreference(
              NotificationType.EMAIL,
              "erdemjoosten@gmail.com"
            ),
          ],
          ScrumRole.PRODUCT_OWNER
        );
      }).toThrowError("Invalid first name");
    });

    it("should throw an error for invalid last name", () => {
      expect(() => {
        factory.createUser(
          "erdem",
          "",
          "erdemjoosten@gmail.com",
          "0637916452",
          [
            new NotificationPreference(
              NotificationType.EMAIL,
              "erdemjoosten@gmail.com"
            ),
          ],
          ScrumRole.PRODUCT_OWNER
        );
      }).toThrowError("Invalid last name");
    });

    it("should throw an error for invalid email", () => {
      expect(() => {
        factory.createUser(
          "erdem",
          "Doe",
          "invalid-email",
          "0637916452",
          [
            new NotificationPreference(
              NotificationType.EMAIL,
              "erdemjoosten@gmail.com"
            ),
          ],
          ScrumRole.PRODUCT_OWNER
        );
      }).toThrowError("Invalid email");
    });

    it("should throw an error for Invalid phone number number", () => {
      expect(() => {
        factory.createUser(
          "erdem",
          "Doe",
          "erdemjoosten@gmail.com",
          "invalid-phone",
          [
            new NotificationPreference(
              NotificationType.EMAIL,
              "erdemjoosten@gmail.com"
            ),
          ],
          ScrumRole.PRODUCT_OWNER
        );
      }).toThrowError("Invalid phone number");
    });
  });
});
