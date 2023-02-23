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
import { AbstractPipelineVisitor } from "./pipelineVisitor";

export class ActionVisitor extends AbstractPipelineVisitor {

  public override visitPipeline(pipeline: AbstractDevelopmentPipeline): void {
    console.log("TODO")
  }
  public override visitGithub(action: GithubSourceAction): void {
    console.log(action.executeAction());
  }
  public override visitGitlab(action: GitlabSourceAction): void {
    console.log(action.executeAction());
  }
  public override visitNPM(action: NPMPackageAction): void {
    console.log(action.executeAction());
  }
  public override visitYARN(action: YARNPackageAction): void {
    console.log(action.executeAction());
  }
  public override visitDotnetCore(action: DotNetCoreBuildAction): void {
    console.log(action.executeAction());
  }
  public override visitMaven(action: MavenBuildAction): void {
    console.log(action.executeAction());
  }
  public override visitNUnit(action: NUnitTestAction): void {
    console.log(action.executeAction());
  }
  public override visitSelenium(action: SeleniumTestAction): void {
    console.log(action.executeAction());
  }
  public override visitSonarCloud(action: SonarCloudAnalyzeAction): void {
    console.log(action.executeAction());
  }
  public override visitDeepsource(action: DeepsourceAnalyzeAction): void {
    console.log(action.executeAction());
  }
  public override visitAzure(action: AzureDeployAction): void {
    console.log(action.executeAction());
  }
  public override visitAWS(action: AWSDeployAction): void {
    console.log(action.executeAction());
  }
}