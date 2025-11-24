export function ok() {
  return `\x1b[37m\x1b[42m  ✔  \x1b[0m`;
}

export function err() {
  return `\x1b[37m\x1b[41m  X  \x1b[0m`;
}

export function override() {
  return `\x1b[46m\x1b[30m  －  \x1b[0m`;
}

export function line(message, test) {
  writeConsoleLine(message, test ? ok : err);
}

export function writeConsoleLine(message, fn) {
  console.log(`${fn.call()} ${message}`);
}