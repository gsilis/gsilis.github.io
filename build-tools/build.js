import { ok, err } from "./utilities/console-helpers.js";
import { buildProject } from "./utilities/build-project.js";
import { injectScript } from "./utilities/inject-script.js";
import { ProjectInfo } from "./utilities/project-info.js";
import { homepageBuilder } from "./utilities/homepage-builder.js";
import { execSync } from "child_process";

const info = new ProjectInfo('../../projects.json');
const workingProjects = info.allProjects().filter((p) => {
  console.group(p.title);
  const result = buildProject(p) && injectScript(p);
  console.log(result ? ok() + ' COMPLETE\n\n' : err() + ' FAILED\n\n');
  console.groupEnd();
  return result;
});

console.group('Homepage');
console.log('Building....');
const result = homepageBuilder(info.allSections(), workingProjects);
result ? console.log(`${ok()} COMPLETE\n\n`) : console.error(`${err()} FAILED\n\n`);
console.groupEnd();

try {
  const status = execSync('git status', { encoding: 'utf-8' });
  console.log(status);
} catch (err) {
  console.error(`${err()} Could not output git status`);
  process.exit(1);
}

process.exit(0);
