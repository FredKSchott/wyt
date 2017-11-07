import * as path from 'path';
import * as fs from 'fs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const license = fs.readFileSync(path.resolve('LICENSE'), 'utf-8');

const bannerLines = [];
bannerLines.push('/*!');
bannerLines.push(` * ${pkg.name} v${pkg.version}`);
bannerLines.push(' *');
license.split(/\r?\n/).forEach((line) => {
  bannerLines.push(` * ${line}`);
});
bannerLines.push(' */');

const banner = bannerLines.join('\n');

export default {
  input: 'src/index.js',
  sourcemap: true,
  banner,
  plugins: [
    babel({
      babelrc: false,
      plugins: [
        'syntax-flow',
        'transform-flow-comments',
      ],
    }),
  ],
  output: [
    {
      file: 'build/index.js',
      format: 'cjs',
    },
    {
      file: 'build/index.es.js',
      format: 'es',
    },
  ],
};
