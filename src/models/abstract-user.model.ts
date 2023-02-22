export abstract class User {
  private name: string;
  private email: string;
  private role: string;
  private description: string;

  constructor(name: string, email: string, role: string, description: string) {
    this.name = name;
    this.email = email;
    this.role = role;
    this.description = description;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public setEmail(email: string) {
    this.email = email;
  }
  
  public getEmail(): string {
    return this.email;
  }

  public setRole(role: string) {
    this.role = role;
  }
  
  public getRole(): string {
    return this.role;
  }

  public setDescription(description: string) {
    this.description = description;
  }
  
  public getDescription(): string {
    return this.description;
  }

}
