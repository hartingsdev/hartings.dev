import { spawnSync } from 'child_process';
import { resolve } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = require('../node_modules/astro/package.json');
const binPath = resolve('./node_modules/astro', pkg.bin.astro);
const result = spawnSync('node', [binPath, ...process.argv.slice(2)], { stdio: 'inherit' });
process.exit(result.status ?? 0);
