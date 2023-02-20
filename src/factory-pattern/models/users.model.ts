import { User } from "./abstract-user.model";

// Concrete user classes
export class Developer extends User {
  public constructor(name: string, email: string, role: string) {
    super(name, email, role);
  }

  public getRole(): string {
    return super.role;
  }
  public getEmail(): string {
    return super.email;
  }
  public getDescription() {
    return "I am a developer.";
  }
}

export class LeadDeveloper extends User {
  public constructor(name: string, email: string, role: string) {
    super(name, email, role);
  }
  public getRole(): string {
    return super.role;
  }
  public getEmail(): string {
    return super.email;
  }
  public getDescription() {
    return "I am a lead developer.";
  }
}

export class ScrumMaster extends User {
  public constructor(name: string, email: string, role: string) {
    super(name, email, role);
  }
  public getRole(): string {
    return super.role;
  }
  public getEmail(): string {
    return super.email;
  }
  public getDescription() {
    return "I am a scrum master.";
  }
}

export class ProductOwner extends User {
  public constructor(name: string, email: string, role: string) {
    super(name, email, role);
  }
  public getRole(): string {
    return super.role;
  }
  public getEmail(): string {
    return super.email;
  }
  public getDescription() {
    return "I am a product owner.";
  }
}
