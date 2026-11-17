import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn } from '@/lib/utils'

export function RichText({ data, className }: { data?: unknown; className?: string }) {
  if (!data || typeof data !== 'object') return null
  return (
    <LexicalRichText
      data={data as SerializedEditorState}
      className={cn(
        'prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary prose-p:text-muted',
        className,
      )}
    />
  )
}
