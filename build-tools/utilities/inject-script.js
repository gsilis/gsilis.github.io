import path from 'path';
import fs from 'fs';
import { parse } from 'node-html-parser';

export function injectScript(info) {
  const moduleName = info.moduleName || info.id;
  const indexPath = path.resolve(`./projects/${moduleName}/index.html`);
  const contents = fs.readFileSync(indexPath);
  const html = parse(contents);

  if (!html) {
    console.error('Could not load index.html file!');
    return;
  }

  const head = html.querySelector('head');

  if (!head) {
    console.error('index.html file does not contain <head>!');
    return;
  }

  const metaTag = html.querySelector('meta[name=project-name]');
  const script = html.querySelector('script[src=/scripts/project.js]');

  let changed = false;

  if (!script) {
    changed = true;
    head.prepend('\n<script src="/scripts/project.js"></script>');
  }

  if (!metaTag) {
    changed = true;
    head.prepend(`\n<meta name="project-name" content="${info.title}" />`);
  }

  if (changed) {
    fs.writeFileSync(indexPath, html.toString());
    console.log(`index.html file changed, writing to ${indexPath}`);
  } else {
    console.log('index.html file is unchanged, skipping write.');
  }

  return true;
}