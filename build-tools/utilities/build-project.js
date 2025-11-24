import path from 'path';
import { execSync } from 'child_process';

export function buildProject(info) {
  const moduleName = info.submodule || info.id;
  const basePath = `projects/${moduleName}`;
  const projectDirectory = path.resolve(import.meta.dirname, '../../', moduleName);
  const targetDirectory = path.resolve(import.meta.dirname, '../../', basePath);

  try {
    execSync(`cd ${projectDirectory}; npm install`, { encoding: 'utf-8' });
  } catch (err) {
    console.error(`Could not run install for ${info.id}`);
    return;
  }

  try {
    execSync(`cd ${projectDirectory}; npx vite build ./ --base=/${basePath} --outDir=../${basePath} --emptyOutDir`, { encoding: 'utf-8' });
  } catch(err) {
    console.error(`Could not build ${info.id}`);
    return;
  }

  return true;
}