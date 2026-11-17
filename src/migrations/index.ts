import * as migration_20261117_223415_initial from './20261117_223415_initial';

export const migrations = [
  {
    up: migration_20261117_223415_initial.up,
    down: migration_20261117_223415_initial.down,
    name: '20261117_223415_initial'
  },
];
