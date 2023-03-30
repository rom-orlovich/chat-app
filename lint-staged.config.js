// Lint-staged.config.js
module.exports = {
  // Type check TypeScript files
  "./client/**/*.(ts|tsx)": () => "npx tsc -p client/tsconfig.json --noEmit",
  "./server/**/*.(ts|tsx)": () => "npx tsc -p server/tsconfig.json --noEmit",

  // Lint then format TypeScript and JavaScript files
  "**/*.(ts|tsx|js)": (filenames) => [`eslint --fix ${filenames.join(" ")}`],

  // Format MarkDown and JSON
  "**/*.(md|json)": (filenames) =>
    `npx prettier --write ${filenames.join(" ")}`,
};
