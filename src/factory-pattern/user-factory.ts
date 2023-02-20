import { User } from "./models/abstract-user.model";
import { Developer, LeadDeveloper, ScrumMaster, ProductOwner } from "./models/users.model";

// UserFactory class
export class UserFactory {
  static createUser(name: string, email: string, role: string): User {
    switch (role) {
      case "Developer":
        return new Developer(name, email, role);
      case "LeadDeveloper":
        return new LeadDeveloper(name, email, role);
      case "ScrumMaster":
        return new ScrumMaster(name, email, role);
      case "ProductOwner":
        return new ProductOwner(name, email, role);
      default:
        throw new Error(`Unknown role: ${role}`);
    }
  }
}