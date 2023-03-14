export interface ISprintState {
  create(): void;
  start(): void;
  finish(): void;
  release(): void;
  review(): void;
  close(): void;
}
