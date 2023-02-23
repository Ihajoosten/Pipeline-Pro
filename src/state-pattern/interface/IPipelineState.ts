export interface IPipelineState {
  onSource(): void;
  onPackage(): void;
  onBuild(): void;
  onTest(): void;
  onAnalyze(): void;
  onDeploy(): void;
}
