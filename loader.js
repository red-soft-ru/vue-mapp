
const fs = require('fs');
const path = require('path');
const { transform } = require('@babel/core');
const { parseQuery } = require('loader-utils');
const babelrc = require('./package.json').babel;

const transpile = (code) => transform(code, babelrc).code;

module.exports = function(source, map) {
	this.cacheable && this.cacheable();

	const query = parseQuery(this.resourceQuery);
	const fileDir = this.resourcePath.replace(path.basename(this.resourcePath), '');
	const filePath = path.resolve(fileDir, query['path']);
	const fileName = path.basename(filePath).replace('.vue', '');
  source = fs.readFileSync(filePath, 'utf8');

	const code = `
		import Vue from 'vue';
		// import ExampleLoading from 'docs/components/ExampleLoading';

		export default function (Component) {
			const asyncComponent = () => ({
				component: import('${filePath}'),
				// loading: ExampleLoading,
				delay: 0,
			});

			Vue.component('${fileName}', asyncComponent);

			Component.options.examples = Component.options.examples || {};
			Component.options.examples['${fileName}'] = {
				name: '${fileName}',
				source: ${JSON.stringify(source)},
			};
		}
	`;

	this.callback(null, transpile(code), map);
};
