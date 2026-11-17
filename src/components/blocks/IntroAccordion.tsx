import { ChevronRight, Plus } from 'lucide-react'
import Link from 'next/link'

import { Icon } from '../Icon'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Media } from '../Media'
import { Reveal } from '../motion'
import { asMedia, cn, type BlockOf } from '@/lib/utils'

/**
 * Two-tone heading and a link card on the left; a step accordion on the right
 * (shadcn/Radix Accordion: one item open at a time, animated height).
 */
export function IntroAccordionBlock({ block }: { block: BlockOf<'introAccordion'> }) {
  const items = block.items ?? []
  const card = block.linkCard

  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className="wrap grid items-center gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-28">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-normal leading-[1.15] md:text-4xl xl:text-[2.75rem]">
            {block.headingMuted && <span className="text-ink/40">{block.headingMuted} </span>}
            {block.heading && <span className="text-ink">{block.heading}</span>}
          </h2>
          {block.body && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{block.body}</p>
          )}

          {card?.url && (
            <div className="mt-10 max-w-md">
              {card.lead && <p className="text-lg text-ink/40">{card.lead}</p>}
              <Link
                href={card.url}
                className="group mt-3 flex items-center gap-4 rounded-2xl border border-line bg-white p-2.5 pr-4 shadow-sm shadow-ink/5 transition-colors hover:border-ink/30"
              >
                {asMedia(card.image) && (
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                    <Media resource={card.image} fill sizes="64px" />
                  </span>
                )}
                <span className={cn('flex-1 font-medium text-ink', !asMedia(card.image) && 'pl-2')}>
                  {card.title ?? card.url}
                </span>
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-ink">
                  <ChevronRight className="size-4" aria-hidden />
                </span>
              </Link>
            </div>
          )}
        </Reveal>

        {items.length > 0 && (
          <Reveal delay={0.15}>
            <Accordion
              type="single"
              collapsible
              defaultValue={items[0].id ?? '0'}
              className="space-y-2 rounded-3xl border border-line bg-white p-3 sm:p-4"
            >
              {items.map((item, i) => (
                <AccordionItem
                  key={item.id ?? i}
                  value={item.id ?? String(i)}
                  className="group relative rounded-2xl border-b-0 transition-colors duration-300 data-[state=open]:bg-ink/[0.035]"
                >
                  {/* Connector between step icons */}
                  {i < items.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute -bottom-2 left-[1.6rem] top-[3.25rem] w-px bg-line"
                    />
                  )}
                  <AccordionTrigger
                    className="items-center gap-4 rounded-2xl border border-transparent px-4 py-3.5 text-lg font-medium text-ink transition-colors duration-300 hover:no-underline data-[state=closed]:hover:bg-ink/[0.03] data-[state=open]:border-ink data-[state=open]:bg-white"
                    indicator={
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-ink/40">
                        <Plus
                          className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-45"
                          aria-hidden
                        />
                      </span>
                    }
                  >
                    <span className="flex flex-1 items-center gap-4">
                      <Icon
                        name={item.icon}
                        className="size-5 shrink-0 text-ink/60 transition-colors group-data-[state=open]:text-primary"
                      />
                      {item.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-[3.25rem] pr-6 pt-3 text-base leading-relaxed text-ink/75 sm:text-lg">
                    {item.text}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        )}
      </div>
    </section>
  )
}
