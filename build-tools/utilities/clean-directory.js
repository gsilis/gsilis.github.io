import path from 'path';
import fs from 'fs';

export function cleanProjectDirectory(info) {
  const moduleName = info.moduleName || info.id;
  const projectDir = path.resolve(`./projects/${moduleName}`);

  try {
    fs.rmSync(projectDir, { recursive: true, force: true });
  } catch (err) {
    console.error(`Could not delete project build directory for ${moduleName}.`);
    return;
  }

  return true;
}