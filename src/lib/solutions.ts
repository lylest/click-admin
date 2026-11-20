import type { Media, Product } from '@/payload-types'

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

type Slide = {
  id?: string | null
  image: number | Media
  title: string
  text?: string | null
  link?: { label?: string | null; url?: string | null }
}

/**
 * Same idea for the "Our products" slideshow: when its slides link to
 * solutions, every solution with a hero photo gets a slide. Slides the editor
 * made stay first and unchanged; slides for deleted solutions are dropped.
 */
export function solutionSlides<T extends Slide>(slides: T[], products: Product[]): (T | Slide)[] {
  const target = (s: Slide) => s.link?.url ?? ''
  if (!slides.some((s) => target(s).startsWith(SOLUTIONS))) return slides

  const slugs = new Set(products.map((p) => `${SOLUTIONS}${p.slug}`))
  const kept = slides.filter((s) => !target(s).startsWith(SOLUTIONS) || slugs.has(target(s)))
  const covered = new Set(kept.map(target))
  const added = products
    .filter((p) => p.heroImage && !covered.has(`${SOLUTIONS}${p.slug}`))
    .map((p) => ({
      id: `solution-${p.id}`,
      image: p.heroImage as number | Media,
      title: p.name.trim(),
      text: p.shortDescription?.trim() || null,
      link: { label: `Explore ${p.name.trim()}`, url: `${SOLUTIONS}${p.slug}` },
    }))
  return [...kept, ...added]
}
