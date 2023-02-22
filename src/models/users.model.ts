import { User } from "./abstract-user.model";

export class Developer extends User {
  public constructor(name: string, email: string, role: string) {
    super(name, email, role);
  }
  public getRole(): string {
    return this.role;
  }
  public getEmail(): string {
    return this.email;
  }
  public getDescription() {
    return "I am a developer.";
  }
  // public log(): void {
  //   console.log(`Developer: ${this.name}`);
  // }
}

export class LeadDeveloper extends User {
  public constructor(name: string, email: string, role: string) {
    super(name, email, role);
  }
  public getRole(): string {
    return this.role;
  }
  public getEmail(): string {
    return this.email;
  }
  public getDescription() {
    return "I am a lead developer.";
  }
  // public log(): void {
  //   console.log(`Lead developer: ${this.name}`);
  // }
}

export class ScrumMaster extends User {
  public constructor(name: string, email: string, role: string) {
    super(name, email, role);
  }

  public getRole(): string {
    return this.role;
  }
  public getEmail(): string {
    return this.email;
  }
  public getDescription() {
    return "I am a scrum master.";
  }
  // public log(): void {
  //   console.log(`Scrum master: ${this.name}`);
  // }
}

export class ProductOwner extends User {
  public constructor(name: string, email: string, role: string) {
    super(name, email, role);
  }
  public getRole(): string {
    return this.role;
  }
  public getEmail(): string {
    return this.email;
  }
  public getDescription() {
    return "I am a product owner.";
  }
  // public log(): void {
  //   console.log(`Product owner: ${this.name}`);
  // }
}
