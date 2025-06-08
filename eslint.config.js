import config from './my-react-app/eslint.config.js';

function trimGlobals(globalsObj = {}) {
  return Object.fromEntries(
    Object.entries(globalsObj).map(([k, v]) => [k.trim(), v])
  );
}

export default config.map((entry) =>
  entry.languageOptions && entry.languageOptions.globals
    ? {
        ...entry,
        languageOptions: {
          ...entry.languageOptions,
          globals: trimGlobals(entry.languageOptions.globals),
        },
      }
    : entry
);
