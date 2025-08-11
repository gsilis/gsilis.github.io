(function() {
  const css = `
    :host { display: flex; height: 32px; background: linear-gradient(0, rgb(0, 0, 0), rgb(50, 50, 50)); width: fit-content; position: absolute; top: 0; left: 0; font-family: Helvetica, Arial, sans-serif; font-size: 12px; }
    .icon { flex: 32px 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(-45deg, rgb(217, 224, 33), rgb(0, 255, 255)); }
    .icon a { width: 32px; height: 32px; display: flex; justify-content: center; align-items: center; }
    .icon a #arrow { width: 0; height: 0; }
    .icon img { flex: 1; }
    .icon a * { transition: all 0.25s ease-in-out; }
    .icon a:hover #arrow { width: 6px; height: 6px; }
    .icon a:hover #icon { width: 20px; height: 20px;  }
    .name { flex: 1; width: fit-content; color: white; text-wrap: nowrap; display: flex; flex-direction: row; align-items: center; padding: 0 8px; }
  `;

  class ProjectBar extends HTMLElement {
    constructor() {
      super();
  
      this.shadow = this.attachShadow({ mode: 'open' });
      this.shadow.innerHTML = `
        <style>${css}</style>
        <div class="icon">
          <a href="/" title="Home">
            <svg id="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.01 64">
              <rect x="1.37" y="28.68" width="45.26" height="22.63" transform="translate(35.31 -5.26) rotate(45)"/>
              <rect x="1.37" y="12.69" width="45.26" height="22.63" transform="translate(-9.94 24) rotate(-45)"/>
            </svg>
            <svg id="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144" width="24" height="24">
              <defs>
                <style>
                  .cls-1 {
                    fill: #fff;
                    font-family: Charter-Bold, Charter;
                    font-size: 60px;
                    font-weight: 700;
                  }
                </style>
              </defs>
              <circle cx="72" cy="72" r="72"/>
              <text class="cls-1" transform="translate(18.28 88.88)"><tspan x="0" y="0">+/-</tspan></text>
            </svg>
          </a>
        </div>
        <div class="name">This is the project name</div>
      `;

      this.projectName = this.shadow.querySelector('div.name');
    }
  
    connectedCallback() {
      const metaName = document.querySelector('meta[name=project-name]');

      if (metaName && metaName.content) {
        this.projectName.innerHTML = metaName.content;
      } else {
        this.projectName.style.display = 'none';
      }
    }
  }
  
  customElements.define('project-bar', ProjectBar);

  function setup() {
    document.removeEventListener('DOMContentLoaded', setup);

    const bar = document.createElement('project-bar');
    document.body.append(bar);
  }

  document.addEventListener('DOMContentLoaded', setup);
})();