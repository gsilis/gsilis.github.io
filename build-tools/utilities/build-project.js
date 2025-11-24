import path from 'path';
import { execSync } from 'child_process';

export function buildProject(info) {
  const moduleName = info.submodule || info.id;
  const basePath = `projects/${moduleName}`;
  const projectDirectory = path.resolve(import.meta.dirname, '../../', moduleName);
  const targetDirectory = path.resolve(import.meta.dirname, '../../', basePath);

  try {
    const result = execSync(`npx vite build ./${moduleName} --base=/${basePath} --outDir=./${basePath}`, { encoding: 'utf-8' });
    console.log('BUILD', result);
  } catch(err) {
    console.error('Not built', err);
  }
}