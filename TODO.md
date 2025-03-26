# Improvements

- Locally-run scripts before push to main check if projects exist in manifest.
  - If a project is missing, print its folder name.
  - If a project folder exists but is not in the manifest, call it out.
  - Check if index file exists in the project folder.
  - Check if parsed index file has the `project.js` file referenced.
  - Maybe a way to check for broken links?
- Local script to inject `project.js` or other alterations into project files?
- Could the project manifest pull the latest build from github, unpack it, and inject what it needs?
  - Would be done locally, rather than on github via an action, since the action would have to modify `main`?