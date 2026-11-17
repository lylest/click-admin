/**
 * `npm run seed`       — add any missing default content
 * `npm run seed:reset` — overwrite pages/solutions/news/globals with the defaults
 * (`payload run` does not forward CLI flags, so reset is passed via SEED_RESET.)
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { seed } from './index'

const payload = await getPayload({ config })
await seed(payload, { overwrite: process.env.SEED_RESET === '1' })
process.exit(0)
