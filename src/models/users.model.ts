import { Composite } from "../composite-pattern/models/composite.model";
import { User } from "./abstract-user.model";

// Concrete user classes
export class Developer extends User {
  public constructor(name: string, email: string, role: string) {
    super(name, email, role);
  }
  public log(): void {
    console.log(`Developer: ${this.name}`);
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
}

export class LeadDeveloper extends User {
  public constructor(name: string, email: string, role: string) {
    super(name, email, role);
  }
  public log(): void {
    console.log(`Lead developer: ${this.name}`);
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
}

export class ScrumMaster extends User {
  public constructor(name: string, email: string, role: string) {
    super(name, email, role);
  }
  public log(): void {
    console.log(`Scrum master: ${this.name}`);
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
}

export class ProductOwner extends User {
  public constructor(name: string, email: string, role: string) {
    super(name, email, role);
  }
  public log(): void {
    console.log(`Product owner: ${this.name}`);
  }
  protected isCompatible(component: Composite): boolean {
    return component instanceof ProductOwner;
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
}
