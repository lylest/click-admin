import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Inquiries } from './collections/Inquiries'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Products } from './collections/Products'
import { Users } from './collections/Users'
import { Footer } from './globals/Footer'
import { SiteText } from './globals/SiteText'
import { Header } from './globals/Header'
import { Settings } from './globals/Settings'
import { seedIfEmpty } from './seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' — Click Group CMS' },
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Pages, Products, Posts, Media, Inquiries, Users],
  globals: [Settings, Header, Footer, SiteText],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URL || '' },
  }),
  sharp,
  // First start on an empty database loads the default content from CONTENT.md.
  onInit: seedIfEmpty,
})
