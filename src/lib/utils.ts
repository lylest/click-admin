import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { Media, Page } from '@/payload-types'

export type LayoutBlock = NonNullable<Page['layout']>[number]
export type BlockOf<T extends LayoutBlock['blockType']> = Extract<LayoutBlock, { blockType: T }>

/** shadcn-style class merge: later classes override earlier conflicting ones. */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

/** Upload fields come back as an id (depth 0) or a populated doc. */
export const asMedia = (value: unknown): Media | null =>
  value && typeof value === 'object' && 'url' in value ? (value as Media) : null

export const isExternal = (url: string) => /^(https?:)?\/\//.test(url)

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export const categoryLabel: Record<string, string> = {
  company: 'Company',
  'click-meter': 'Click Meter',
  healthcare: 'Healthcare',
}

/** Default content marks unknown values like "[+255 XXX XXX XXX]". Never show those live. */
export const isPlaceholder = (value?: string | null) => !value || /\[[^\]]*\]/.test(value)

/** Keeps only the lines of a multi-line value that are not placeholders. */
export const realLines = (value?: string | null) =>
  (value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !isPlaceholder(line))
