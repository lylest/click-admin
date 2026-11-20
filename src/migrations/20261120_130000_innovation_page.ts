import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Content changes, made through Payload so `updatedAt` moves and anyone with
 * the home page open in the admin gets the "modified, reload" warning instead
 * of saving over these changes.
 *
 * 1. Innovation page (/innovation): page header plus a card for every solution.
 * 2. Home page "OUR INNOVATION" card gets its button back, now pointing there.
 * 3. The unused "click water.jpeg" upload is deleted (client request).
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'innovation' } }, limit: 1, req })
  if (!existing.docs.length) {
    await payload.create({
      collection: 'pages',
      req,
      data: {
        title: 'Innovation',
        slug: 'innovation',
        layout: [
          {
            blockType: 'pageHeader',
            heading: 'Our innovations',
            subheading:
              'Protected innovations advancing practical engineering and technology solutions. Each one is designed, built and supported by our own team in Tanzania.',
          },
          { blockType: 'productCards', heading: 'Our solutions', products: [] },
        ],
        seo: {
          metaTitle: 'Innovation | Click Group',
          metaDescription: 'Engineering and technology solutions designed, built and supported by Click Group in Tanzania.',
        },
      },
    })
  }

  const home = (await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, depth: 0, limit: 1, req })).docs[0]
  if (home?.layout) {
    let changed = false
    const layout = home.layout.map((block) => {
      if (block.blockType !== 'bento') return block
      return {
        ...block,
        cards: block.cards?.map((card) => {
          if (card.label?.toUpperCase() !== 'OUR INNOVATION' || card.link?.url) return card
          changed = true
          return { ...card, link: { label: 'Discover Our Innovations', url: '/innovation' } }
        }),
      }
    })
    if (changed) await payload.update({ collection: 'pages', id: home.id, data: { layout }, req })
  }

  const water = await payload.find({ collection: 'media', where: { filename: { equals: 'click water.jpeg' } }, limit: 1, req })
  const doc = water.docs[0]
  if (doc) {
    // Only delete it if nothing on the site uses it.
    const tables = (await db.all(
      sql`SELECT m.name AS t, p.name AS c FROM sqlite_master m, pragma_table_info(m.name) p WHERE m.type = 'table' AND p.name LIKE '%image_id'`,
    )) as { t: string; c: string }[]
    let uses = 0
    for (const { t, c } of tables) {
      const rows = (await db.all(sql.raw(`SELECT count(*) AS n FROM "${t}" WHERE "${c}" = ${Number(doc.id)}`))) as { n: number }[]
      uses += Number(rows[0]?.n ?? 0)
    }
    if (uses === 0) await payload.delete({ collection: 'media', id: doc.id, req })
    else payload.logger.warn(`click water.jpeg is used in ${uses} place(s); not deleted`)
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.delete({ collection: 'pages', where: { slug: { equals: 'innovation' } }, req })
}
