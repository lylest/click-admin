import type { CollectionBeforeValidateHook, GlobalBeforeValidateHook } from 'payload'

/**
 * Editors paste copy from documents and chats, which brings leading tabs and
 * trailing spaces with it. Those break anchors and links ("\twho-we-are",
 * "/about ") and show up as odd indents. Trim every plain text value on save.
 * Rich text (Lexical, an object with `root`) is left alone: spaces there
 * separate differently formatted words.
 */
const trimDeep = (value: unknown): unknown => {
  if (typeof value === 'string') return value.trim()
  if (Array.isArray(value)) return value.map(trimDeep)
  if (value && typeof value === 'object' && !('root' in value)) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, trimDeep(v)]))
  }
  return value
}

export const trimCollectionText: CollectionBeforeValidateHook = ({ data }) => trimDeep(data) as typeof data
export const trimGlobalText: GlobalBeforeValidateHook = ({ data }) => trimDeep(data) as typeof data
