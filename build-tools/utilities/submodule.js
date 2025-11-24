import fs from 'fs';
import path from 'path';

export function submoduleFolderFor(name) {
  const pathToSubmodule = path.resolve(import.meta.dirname, '../../', name); 
  let submoduleDirectory;

  try {
    submoduleDirectory = fs.statSync(pathToSubmodule);
    return submoduleDirectory.isDirectory();
  } catch (err) {
    return false;
  }
}

export function findFile(directory, fileName) {
  if (!directory) return false;
  const filePath = path.resolve(import.meta.dirname, '../../', directory, fileName);
  let file;

  try {
    file = fs.statSync(filePath);
    return file.isFile();
  } catch (err) {
    return false;
  }
}