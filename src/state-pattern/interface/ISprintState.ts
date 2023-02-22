export interface ISprintState {
  onCreate(): void;
  onStart(): void;
  onFinish(): void;
  onReview(): void;
  onComplete(): void;
  onClose(): void;
}


/**
 * - initialization --> onCreate();
 * - active (daily scrum) --> onStart();
 * - finished --> onFinished();
 * - retrospective --> onReview();
 * - completed --> onComplete();
 * - closed  --> onClosed();
 */