import { revalidatePath } from 'next/cache'

/**
 * Any content change refreshes the whole site. It is small, so a full
 * revalidation is cheaper to reason about than per-route invalidation.
 * Outside a Next.js request (seed script, migrations) revalidatePath throws;
 * there is nothing cached to clear then, so the error is ignored.
 */
export const revalidateSite = () => {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // not running inside Next.js
  }
}
