import type { Product } from '@/payload-types'

type NavLink = { label: string; url: string; description?: string | null; id?: string | null }

const SOLUTIONS = '/solutions/'

/**
 * Keeps a link list in step with the Solutions collection. A list that holds
 * any /solutions/ link (the Solutions dropdown, the footer's Solutions column)
 * gets one link per solution, in the collection's order. A link the editor
 * typed for the same page keeps its label and description; links to solutions
 * that no longer exist are dropped. Other links stay, after the solutions.
 */
export function withSolutions<T extends NavLink>(links: T[], products: Product[]): (T | NavLink)[] {
  if (!links.some((l) => l.url?.startsWith(SOLUTIONS))) return links

  const fromProducts = products.map((p) => {
    const url = `${SOLUTIONS}${p.slug}`
    return (
      links.find((l) => l.url === url) ?? {
        id: `solution-${p.id}`,
        label: p.name.trim(),
        url,
        description: p.tagline?.trim() || null,
      }
    )
  })
  return [...fromProducts, ...links.filter((l) => !l.url?.startsWith(SOLUTIONS))]
}
