import { User } from "./abstract-user.model";

export class Developer extends User {
  public constructor(name: string, email: string, role: string, description: string) {
    super(name, email, role, description);
  }
}

export class LeadDeveloper extends User {
  public constructor(name: string, email: string, role: string, description: string) {
    super(name, email, role, description);
  }
}

export class ScrumMaster extends User {
  public constructor(name: string, email: string, role: string, description: string) {
    super(name, email, role, description);
  }
}

export class ProductOwner extends User {
  public constructor(name: string, email: string, role: string, description: string) {
    super(name, email, role, description);
  }
}
