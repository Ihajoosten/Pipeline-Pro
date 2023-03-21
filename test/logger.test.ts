import { UserFactory } from "../src/factory-pattern/user-factory";
import { ScrumRole } from "../src/models/enumerations";
import { Pipeline } from "../src/models/pipeline.model";
import { User } from "../src/models/user.model";
import { PipelineTestState } from "../src/state-pattern/states/pipeline-states/test.state";
import { AdvancedLogVisitor } from "../src/visitor-pattern/visitors/advancedLogVisitor";
import { SimpleLogVisitor } from "../src/visitor-pattern/visitors/simpleLogVisitor"

describe("Logger Tests", () => {
    const simpleLogVisitor = new SimpleLogVisitor();
    const advancedLogVisitor = new AdvancedLogVisitor();
    const productOwner: User = new UserFactory().createUser("Erdem", "Pekguzel", "er@d.em", "0612345678", [], ScrumRole.PRODUCT_OWNER);
    const scrumMaster: User = new UserFactory().createUser("Erdem", "Pekguzel", "er@d.em", "0612345678", [], ScrumRole.SCRUM_MASTER);
    const pipeline = new Pipeline("pipeline", productOwner, scrumMaster);
    const pipelineTestState = new PipelineTestState(pipeline);

    it("should output a simple log", () => {
        simpleLogVisitor.visit(pipelineTestState)

        expect(simpleLogVisitor.getLog()).toBe(`${pipelineTestState.getName()}: ${pipelineTestState.getAction()}`);
    });

    it("should output an advanced log", () => {
        advancedLogVisitor.visit(pipelineTestState);

        expect(advancedLogVisitor.getLog()).toBe(`Currently processing the following action: ${pipelineTestState.getAction()} in the ${pipelineTestState.getName()}!`);
    });
});