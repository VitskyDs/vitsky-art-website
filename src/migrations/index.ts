import * as migration_20260414_204456 from './20260414_204456';
import * as migration_20260415_045420 from './20260415_045420';
import * as migration_20260415_053137 from './20260415_053137';
import * as migration_20260415_064149 from './20260415_064149';

export const migrations = [
  {
    up: migration_20260414_204456.up,
    down: migration_20260414_204456.down,
    name: '20260414_204456',
  },
  {
    up: migration_20260415_045420.up,
    down: migration_20260415_045420.down,
    name: '20260415_045420',
  },
  {
    up: migration_20260415_053137.up,
    down: migration_20260415_053137.down,
    name: '20260415_053137',
  },
  {
    up: migration_20260415_064149.up,
    down: migration_20260415_064149.down,
    name: '20260415_064149'
  },
];
