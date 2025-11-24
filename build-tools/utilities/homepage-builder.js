import path from 'path';
import fs from 'fs';
import { parse } from 'node-html-parser';
import { err } from './console-helpers.js';

export function homepageBuilder(sections, projects) {
  const indexPath = path.resolve(import.meta.dirname, '../../index.html');
  const contents = fs.readFileSync(indexPath, { encoding: 'utf-8' });
  const dom = parse(contents);
  const canvas = dom.querySelector('div.main');

  const insert = sections.map((section) => {
    const sectionProjects = projects.filter(p => p.section === section.id);
    const sectionHtml = sectionProjects.map((project) => {
      const raster = project.raster || false;
      const src = project.splashSrc;
      const alt = project.splashAlt;
      const cta = project.cta || 'Run';
      const projectPath = `/projects/${project.id}`;

      if (!src) console.log(`${err()} ${project.title} 'splashSrc' is missing!`);
      if (!alt) console.log(`${err()} ${project.title} 'splashAlt' is missing!`);

      const image = raster ? `<div class="raster-wrapper"><img src="${src}" alt="${alt}" /></div>` : `<img class="svg" src="${src}" alt="${alt}" />`;

      return `
        <section>
          ${image}
          <h2>${project.title}</h2>
          <p>${project.description}</p>
          <a class="play" href="${projectPath}">${cta}</a>
        </section>
      `.replace(/\n/g, '').trim();
    });

    return `
      <article>
        <h1>${section.title}</h1>
        <div class="sections">${sectionHtml.join('')}</div>
      </article>
    `.replace(/\n/g, '').trim();
  });

  canvas.innerHTML = insert.join('');
  
  try {
    fs.writeFileSync(indexPath, dom.toString());
  } catch (err) {
    return;
  }

  return true;
}