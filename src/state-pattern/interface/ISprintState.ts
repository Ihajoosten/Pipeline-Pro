export interface ISprintState {
  create: () => void;
  start: () => void;
  complete: () => void;
  release: () => void;
  fail: () => void;
}
