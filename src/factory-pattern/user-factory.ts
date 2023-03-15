import { RegEx, ScrumRole } from "../models/enumerations";
import {
  User,
  ProductOwner,
  ScrumMaster,
  Developer,
  LeadDeveloper,
  NotificationPreference,
  Tester,
} from "../models/user.model";
import RE2 from "re2";

const regEmail = new RE2(RegEx.EMAIL);
const regName = new RE2(RegEx.NAME);
const regPhone = new RE2(RegEx.PHONE_NUMBER);

export class UserFactory {
  createUser(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    notificationPreference: NotificationPreference[],
    role: ScrumRole
  ): User {
    if (!firstName || !this.isValidName(firstName)) {
      throw new Error("Invalid first name");
    }

    if (!lastName || !this.isValidName(lastName)) {
      throw new Error("Invalid last name");
    }

    if (!email || !this.isValidEmail(email)) {
      throw new Error("Invalid email");
    }

    if (!phoneNumber || !this.isValidPhone(phoneNumber)) {
      throw new Error("Invalid phone number");
    }

    switch (role) {
      case ScrumRole.PRODUCT_OWNER:
        return new ProductOwner(firstName, lastName, email, phoneNumber, notificationPreference, role);
      case ScrumRole.SCRUM_MASTER:
        return new ScrumMaster(firstName, lastName, email, phoneNumber, notificationPreference, role);
      case ScrumRole.DEVELOPER:
        return new Developer(firstName, lastName, email, phoneNumber, notificationPreference, role);
      case ScrumRole.LEAD_DEVELOPER:
        return new LeadDeveloper(firstName, lastName, email, phoneNumber, notificationPreference, role);
      case ScrumRole.TESTER:
        return new Tester(firstName, lastName, email, phoneNumber, notificationPreference, role);
      default:
        throw new Error(`Invalid role: ${role}`);
    }
  }

  private isValidName(name: string): boolean {
    return regName.test(name);
  }

  private isValidEmail(email: string): boolean {
    return regEmail.test(email);
  }

  private isValidPhone(phone: string): boolean {
    return regPhone.test(phone);
  }
}
