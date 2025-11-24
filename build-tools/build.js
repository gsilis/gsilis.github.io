import { buildProject } from "./utilities/build-project.js";
import { ProjectInfo } from "./utilities/project-info.js";

const info = new ProjectInfo('../../projects.json');
info.allProjects().forEach((p) => {
  buildProject(p);
});