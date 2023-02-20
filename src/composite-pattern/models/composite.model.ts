export abstract class Composite {
  protected children: Composite[] = [];

  public add(component: Composite): void {
    this.children.push(component);
  }

  public remove(component: Composite): void {
    this.children = this.children.filter((child) => child !== component);
  }

  public getChildren(): Composite[] {
    return this.children;
  }

  public abstract log(): void;
}
