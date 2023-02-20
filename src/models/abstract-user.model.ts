import { Composite } from "../composite-pattern/models/composite.model";

// User abstract class
export abstract class User extends Composite {
  name: string;
  email: string;
  role: string;

  constructor(name: string, email: string, role: string) {
    super();
    this.name = name;
    this.email = email;
    this.role = role;
  }

  public abstract getDescription(): string;
  public abstract getRole(): string;
  public abstract getEmail(): string;
}
