import type { LayoutBlock } from '@/lib/utils'
import { MissionBlock, TeamBlock, TimelineBlock } from './About'
import { BentoBlock } from './Bento'
import { ContactBlock } from './Contact'
import { HeroBlock, PageHeaderBlock } from './Hero'
import { IntroAccordionBlock } from './IntroAccordion'
import { SpotlightBlock } from './Spotlight'
import { CardsBlock } from './Audience'
import { LatestNewsBlock } from './News'
import {
  ContentBlock,
  CtaBlock,
  FaqBlock,
  LogosBlock,
  ProductCardsBlock,
  StatsBlock,
  StepsBlock,
  TestimonialsBlock,
} from './Sections'

/* eslint-disable @typescript-eslint/no-explicit-any */
const components: Record<LayoutBlock['blockType'], (props: { block: any }) => unknown> = {
  hero: HeroBlock,
  pageHeader: PageHeaderBlock,
  logos: LogosBlock,
  content: ContentBlock,
  introAccordion: IntroAccordionBlock,
  bento: BentoBlock,
  productCards: ProductCardsBlock,
  spotlight: SpotlightBlock,
  steps: StepsBlock,
  stats: StatsBlock,
  cards: CardsBlock,
  testimonials: TestimonialsBlock,
  latestNews: LatestNewsBlock,
  cta: CtaBlock,
  timeline: TimelineBlock,
  mission: MissionBlock,
  team: TeamBlock,
  faq: FaqBlock,
  contact: ContactBlock,
}

export function RenderBlocks({ blocks }: { blocks?: LayoutBlock[] | null }) {
  return blocks?.map((block, i) => {
    const Component = components[block.blockType] as (props: {
      block: LayoutBlock
    }) => React.ReactNode
    return Component ? <Component key={block.id ?? i} block={block} /> : null
  })
}
