import * as path from "path";
import * as tl from "vsts-task-lib/task";
import { ToolRunner } from "vsts-task-lib/toolrunner";

tl.setResourcePath(path.join(__dirname, "task.json"));

const 
    typingsFile = tl.getPathInput("typingsjson", true, true),
    cwd = path.dirname(typingsFile) || ".";

let typings = tl.which("typings", false);

tl.debug(`check path: ${typings}`);
if(!tl.exist(typings)) {
	findTypings();
}
else {
	executeTypings();
}

function findTypings() {
    tl.debug("not found global installed Typings, try to find Typings locally.");	
	
	let typingsRuntime = tl.getInput("typingsRuntime", true);
	typingsRuntime = path.resolve(cwd, typingsRuntime);
	
	tl.debug("check path: " + typingsRuntime);
	if(tl.exist(typingsRuntime)) {
	    const tool = tl.createToolRunner(tl.which("node", true));	
	    tool.pathArg(typingsRuntime);
        
        return executeTypings(tool);
	}
    else {
        tl.debug("not found locally installed Typings, trying to install Typings globally.");
    
        installTypings()
            .then(() => executeTypings());
    }
}

function installTypings() {
	const tool = tl.createToolRunner(tl.which("npm", true));
    tool.arg("install");
    tool.arg("-g");
    tool.arg("typings");
    
    return tool.exec()
        .then(() => { typings = tl.which("typings", true); });
}

function executeTypings(tool?: ToolRunner) {
    tl.cd(cwd);

    tool = tool || tl.createToolRunner(typings);
    tool.arg(tl.getInput("command", false));
    tool.arg(tl.getInput("arguments", false));

    return tool.exec()
        .then((code) => {
            tl.setResult(tl.TaskResult.Succeeded, tl.loc("typingsReturnCode", code));
        })
        .catch((err) => {
            tl.debug("taskRunner fail");
            tl.setResult(tl.TaskResult.Failed, tl.loc("typingsFailed", err.message));
        });
}