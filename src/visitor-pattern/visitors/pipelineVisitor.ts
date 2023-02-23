import { AbstractDevelopmentPipeline } from "../../models/pipeline/abstract-development-pipeline.model";
import { DeepsourceAnalyzeAction } from "../actions/analyze-actions/deepsource.action";
import { SonarCloudAnalyzeAction } from "../actions/analyze-actions/sonar-cloud.action";
import { DotNetCoreBuildAction } from "../actions/build-actions/dotnetBuild.action";
import { MavenBuildAction } from "../actions/build-actions/mavenBuild.actiont";
import { AWSDeployAction } from "../actions/deploy-actions/aws.action";
import { AzureDeployAction } from "../actions/deploy-actions/azure.action";
import { NPMPackageAction } from "../actions/package-actions/npm.action";
import { YARNPackageAction } from "../actions/package-actions/yarn.action";
import { GithubSourceAction } from "../actions/source-actions/github.action";
import { GitlabSourceAction } from "../actions/source-actions/gitlab.action";
import { NUnitTestAction } from "../actions/test-actions/nUnit.action";
import { SeleniumTestAction } from "../actions/test-actions/selenium.action";

export abstract class AbstractPipelineVisitor {
  // abstract methods to visit an action

  public abstract visitPipeline(pipeline: AbstractDevelopmentPipeline): void

  // source actions
  public abstract visitGithub(action: GithubSourceAction): void
  public abstract visitGitlab(action: GitlabSourceAction): void

  // package actions
  public abstract visitNPM(action: NPMPackageAction): void
  public abstract visitYARN(action: YARNPackageAction): void

  // build actions
  public abstract visitDotnetCore(action: DotNetCoreBuildAction): void
  public abstract visitMaven(action: MavenBuildAction): void

  // test actions
  public abstract visitNUnit(action: NUnitTestAction): void
  public abstract visitSelenium(action: SeleniumTestAction): void

  // analyze actions
  public abstract visitSonarCloud(action: SonarCloudAnalyzeAction): void
  public abstract visitDeepsource(action: DeepsourceAnalyzeAction): void

  // deploy actions
  public abstract visitAzure(action: AzureDeployAction): void
  public abstract visitAWS(action: AWSDeployAction): void

}