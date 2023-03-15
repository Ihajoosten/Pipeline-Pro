import { ScrumRole } from "../src/models/enumerations";
import { Pipeline } from "../src/models/pipeline.model";
import { User } from "../src/models/user.model";
import { IPipelineState } from "../src/state-pattern/interface/IPipelineState";
import { PipelineSourceState } from "../src/state-pattern/states/pipeline-states/source.state";

describe.only("The user should be able to create a pipeline and work in it.", () => {

  let pipeline: Pipeline;
  let sourceTask: IPipelineState;
  const pipelineName = "pipeline";
  const scrumMaster = new User("Erdem P.", "erd@em.p", ScrumRole.SCRUM_MASTER);

  beforeEach(() => {
    pipeline = new Pipeline(pipelineName, scrumMaster);
    sourceTask = new PipelineSourceState(pipeline)
  });

  it("should add a new task", () => {
    pipeline.addTask(sourceTask);
    expect(pipeline.getTasks()).toHaveLength(1);
  });

  it("should remove an existing task", () => {
    pipeline.addTask(sourceTask);
    pipeline.removeTask(sourceTask);
    expect(pipeline.getTasks()).toHaveLength(0);
  })
});
