import camelCase from 'lodash/camelCase';

const exec = require.context('.', true, /\.ts$/);

const root = {
  modules: {},
};

exec.keys().forEach(fileName => {
  // Get the module path as an array
  const modulePath: string[] = fileName
    // Remove the "./" from the beginning
    .replace(/^\.\//, '')
    // Remove the file extension from the end
    .replace(/\.\w+$/, '')
    // Split nested modules into an array path
    .split(/\//)
    // camelCase all module namespaces and names
    .map(camelCase);

  // Get the modules object for the current path
  const { modules } = getNamespace(root, modulePath);
  const name = modulePath.pop();
  const state = exec(fileName).default;

  if (name && state) {
    // Add the module to our modules object
    modules[name] = state;
  }
});

// Recursively get the namespace of the module, even if nested
function getNamespace(subtree, path) {
  if (path.length === 1) return subtree;

  const namespace = path.shift();
  subtree.modules[namespace] = {
    modules: {},
    ...subtree.modules[namespace],
  };

  return getNamespace(subtree.modules[namespace], path);
}

console.log(root.modules);

export default root.modules;
