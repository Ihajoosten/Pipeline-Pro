export abstract class User {
  name: string;
  email: string;
  role: string;

  constructor(name: string, email: string, role: string) {
    this.name = name;
    this.email = email;
    this.role = role;
  }

  public abstract getDescription(): string;
  public abstract getRole(): string;
  public abstract getEmail(): string;
}
