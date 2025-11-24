import { execSync } from 'child_process';

export function workingDirectoryClearCheck() {
  let stdout;

  try {
    stdout = execSync('git status -s', { encoding: 'utf-8' });
    return stdout.trim() === '';
  } catch (err) {
    return false;
  }
}