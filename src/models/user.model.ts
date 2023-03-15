import { NotificationType, ScrumRole } from "./enumerations";
import { NotificationPreference } from "./notification.model";

export abstract class User {
  protected _firstName: string;
  protected _lastName: string;
  protected _email: string;
  protected _phoneNumber: string;
  protected _notificationPreference: Array<NotificationPreference>;
  protected _role: ScrumRole;

  public constructor(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    notificationPreference: Array<NotificationPreference>,
    role: ScrumRole,
  ) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._role = role;
    this._notificationPreference = notificationPreference;
  }

  public getFirstName(): string {
    return this._firstName;
  }

  public setFirstName(firstName: string) {
    this._firstName = firstName;
  }

  public getLastName(): string {
    return this._lastName;
  }

  public setLastName(lastName: string) {
    this._lastName = lastName;
  }

  public getEmail(): string {
    return this._email;
  }

  public setEmail(email: string) {
    this._email = email;
  }

  public getPhoneNumber(): string {
    return this._phoneNumber;
  }

  public getRole(): ScrumRole {
    return this._role;
  }

  public setPhoneNumber(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
  }

  public getNotificationPreferences(): NotificationPreference[] {
    return this._notificationPreference;
  }

  public addNotificationPreference(
    notificationType: NotificationType,
    address: string
  ) {
    let preference = new NotificationPreference(notificationType, address)
    this._notificationPreference.push(preference);
  }

  public removeNotificationPreference(notificationPreference: NotificationPreference) {
    const index = this._notificationPreference.findIndex(preference =>
      preference.equals(notificationPreference)
    );
    if (index !== -1) {
      this._notificationPreference.splice(index, 1);
    }
  }
}

export class ProductOwner extends User {
  constructor(
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    preference: NotificationPreference[],
    role: ScrumRole = ScrumRole.PRODUCT_OWNER
  ) {
    super(firstname, lastname, email, phone, preference, role);
  }
}

export class ScrumMaster extends User {
  constructor(
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    preference: NotificationPreference[],
    role: ScrumRole = ScrumRole.SCRUM_MASTER
  ) {
    super(firstname, lastname, email, phone, preference, role);
  }
}

export class Developer extends User {
  constructor(
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    preference: NotificationPreference[],
    role: ScrumRole = ScrumRole.DEVELOPER
  ) {
    super(firstname, lastname, email, phone, preference, role);
  }
}

export class LeadDeveloper extends User {
  constructor(
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    preference: NotificationPreference[],
    role: ScrumRole = ScrumRole.LEAD_DEVELOPER
  ) {
    super(firstname, lastname, email, phone, preference, role);
  }
}

export class Tester extends User {
  constructor(
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    preference: NotificationPreference[],
    role: ScrumRole = ScrumRole.TESTER
  ) {
    super(firstname, lastname, email, phone, preference, role);
  }
}
export { NotificationPreference };

