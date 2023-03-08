import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { main } from '../../src/index.js';
import baseArguments from '../helpers/baseArguments.js';
import baseCounters from '../helpers/baseCounters.js';

test('Find unused files, dependencies and exports in workspaces (loose)', async () => {
  const cwd = path.resolve('tests/fixtures/workspaces-pnpm');
  const { issues, counters } = await main({
    ...baseArguments,
    cwd,
  });

  assert.equal(Object.keys(issues.unlisted).length, 1);
  assert(issues.unlisted['apps/a/index.ts']['unlisted']);

  assert.deepEqual(counters, {
    ...baseCounters,
    unlisted: 1,
    processed: 4,
    total: 4,
  });
});