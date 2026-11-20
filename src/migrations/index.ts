import * as migration_20261117_223415_initial from './20261117_223415_initial';
import * as migration_20261120_094316_customer_care_tickets from './20261120_094316_customer_care_tickets';
import * as migration_20261120_130000_innovation_page from './20261120_130000_innovation_page';

export const migrations = [
  {
    up: migration_20261117_223415_initial.up,
    down: migration_20261117_223415_initial.down,
    name: '20261117_223415_initial',
  },
  {
    up: migration_20261120_094316_customer_care_tickets.up,
    down: migration_20261120_094316_customer_care_tickets.down,
    name: '20261120_094316_customer_care_tickets'
  },
  {
    up: migration_20261120_130000_innovation_page.up,
    down: migration_20261120_130000_innovation_page.down,
    name: '20261120_130000_innovation_page'
  },
];
