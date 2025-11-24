import fs from 'fs';
import path from 'path';

export class Projects {
  pathToJson = null;
  _data = null;

  constructor(pathToJson) {
    this.pathToJson = pathToJson;
  }

  data() {
    if (this._data) return this._data;

    const raw = fs.readFileSync(path.resolve(import.meta.dirname, this.pathToJson), 'utf-8');
    const json = JSON.parse(raw);
    this._data = json;
    return this._data;
  }

  allProjects() {
    const data = this.data();
    const projects = data && data.projects || [];
    projects.sort((a, b) => {
      if (a.section === b.section) {
        return a.order - b.order;
      } else if (a.section > b.section) {
        return 1;
      } else {
        return -1;
      }
    });

    return projects;
  }
}