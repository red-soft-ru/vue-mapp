
const fs = require('fs');
const path = require('path');
const { transform } = require('@babel/core');
const yaml = require('js-yaml');
const babelrc = require('../package.json').babel;

const transpile = (code) => transform(code, babelrc).code;
const ifNotEmpty = (v) => v || ''

module.exports = function(source, map) {
	this.cacheable && this.cacheable();

	const sourcePath = this.resourcePath.replace(path.basename(this.resourcePath), '');
	const examples = yaml.safeLoad(source);

	const exampleSources = [];

	examples.forEach(example => {
		const filePath = path.resolve(sourcePath, example.src).replace(/\\/g, '/');
		const fileName = path.basename(filePath).replace('.vue', '')

		exampleSources.push(`
			{
				name: '${fileName}',
				title: '${ifNotEmpty(example.title)}',
				subtitle: '${ifNotEmpty(example.subtitle)}',
				source: ${
					JSON.stringify(fs.readFileSync(filePath, 'utf8'))
				},
				component: () => ({
					component: import('${filePath}'),
					delay: 0,
				})
			}
		`)
	})

	const code = `
		export default function (Component) {
			Component.options.examples = [
				${exampleSources.join(',')}
			];
		}
	`;

	this.callback(null, transpile(code), map);
};
