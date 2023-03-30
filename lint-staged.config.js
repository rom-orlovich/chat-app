// Lint-staged.config.js
module.exports = {
  // Type check TypeScript files
  "cd ./client && **/*.(ts|tsx)": () => "npx tsc --noEmit --jsx react",

  // Lint then format TypeScript and JavaScript files
  "**/*.(ts|tsx|js)": (filenames) => [`eslint --fix ${filenames.join(" ")}`],

  // Format MarkDown and JSON
  "**/*.(md|json)": (filenames) =>
    `npx prettier --write ${filenames.join(" ")}`,
};
