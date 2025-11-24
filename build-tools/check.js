import { line } from "./utilities/console-helpers.js";
import { workingDirectoryClearCheck } from "./utilities/git-check.js";
import { Projects } from "./utilities/projects.js";
import { findFile, submoduleFolderFor } from "./utilities/submodule.js";

const PROJECTS_PATH = '../../projects.json';

const loader = new Projects(PROJECTS_PATH);
let projects;
try {
  projects = loader.allProjects();
} catch (err) {
  console.error(`\x1b[31m\x1b[1mError loading and parsing './projects.json' file. Check it for errors.`);
  console.error(err);
  process.exit(1);
}

const result = await workingDirectoryClearCheck();
line(`Check for clean repository\n`, result);
if (!result) {
  console.error('The build command will modify files in this repo. It\'s best to run it without any unstaged changes.\n');
  process.exit(1);
}

console.group('\x1b[44m\x1b[30mChecking projects...\x1b[0m');
projects.forEach((project) => {
  console.group(`\x1b[43m\x1b[30m${project.title}\x1b[0m`);
  const submoduleName = project.submodule || project.id;
  const submodule = submoduleFolderFor(submoduleName);
  
  line(`Submodule '${submoduleName}' defined.`, submodule);
  line(`index.html file is present.\n`, findFile(submoduleName, 'index.html'));
  line(`index.html meta tag and script injection`, false);
  line(`index.html imports exist\n\n`, false);
  console.groupEnd();
});
console.groupEnd();