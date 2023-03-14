export interface IBacklogItemState {
  toDo: () => void;
  doing: () => void;
  readyForTesting: () => void;
  testing: () => void;
  tested: () => void;
  done: () => void;
}
