/** @type {import('tsup').Options} */
const config = {
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  minify: false,
  outDir: 'dist',
  target: 'es2020',
  platform: 'browser',
}

module.exports = config