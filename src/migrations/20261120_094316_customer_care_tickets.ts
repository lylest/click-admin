import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`tickets\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`ticket\` text NOT NULL,
  	\`subject\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`product\` text,
  	\`account\` text,
  	\`name\` text NOT NULL,
  	\`phone\` text,
  	\`email\` text,
  	\`status\` text DEFAULT 'open',
  	\`emailed\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tickets_ticket_idx\` ON \`tickets\` (\`ticket\`);`)
  await db.run(sql`CREATE INDEX \`tickets_updated_at_idx\` ON \`tickets\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tickets_created_at_idx\` ON \`tickets\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`tickets_id\` integer REFERENCES tickets(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tickets_id_idx\` ON \`payload_locked_documents_rels\` (\`tickets_id\`);`)
  await db.run(sql`ALTER TABLE \`site_text\` ADD \`ticket_heading\` text DEFAULT 'Customer care';`)
  await db.run(sql`ALTER TABLE \`site_text\` ADD \`ticket_intro\` text DEFAULT 'Already a customer? Report a problem with your meter, lift system or account and our support team will follow up. You get a ticket number to quote when you call or write.';`)
  await db.run(sql`ALTER TABLE \`site_text\` ADD \`ticket_email\` text DEFAULT 'support@clickgroup.co.tz';`)
  await db.run(sql`ALTER TABLE \`site_text\` ADD \`ticket_phone\` text DEFAULT '';`)
  await db.run(sql`ALTER TABLE \`site_text\` ADD \`ticket_product\` text DEFAULT 'Product';`)
  await db.run(sql`ALTER TABLE \`site_text\` ADD \`ticket_other_product\` text DEFAULT 'Other';`)
  await db.run(sql`ALTER TABLE \`site_text\` ADD \`ticket_account\` text DEFAULT 'Meter or account number';`)
  await db.run(sql`ALTER TABLE \`site_text\` ADD \`ticket_subject\` text DEFAULT 'Subject';`)
  await db.run(sql`ALTER TABLE \`site_text\` ADD \`ticket_description\` text DEFAULT 'Describe the problem';`)
  await db.run(sql`ALTER TABLE \`site_text\` ADD \`ticket_send\` text DEFAULT 'Submit ticket';`)
  await db.run(sql`ALTER TABLE \`site_text\` ADD \`ticket_sending\` text DEFAULT 'Submitting…';`)
  await db.run(sql`ALTER TABLE \`site_text\` ADD \`ticket_success\` text DEFAULT 'Ticket {ticket} received. Our customer care team will contact you soon.';`)
  await db.run(sql`ALTER TABLE \`site_text\` ADD \`ticket_success_copy\` text DEFAULT 'A copy has been sent to {email}.';`)
  await db.run(sql`ALTER TABLE \`site_text\` ADD \`ticket_error_subject\` text DEFAULT 'Please add a short subject.';`)
  await db.run(sql`ALTER TABLE \`site_text\` ADD \`ticket_error_description\` text DEFAULT 'Please describe the problem.';`)
  await db.run(sql`ALTER TABLE \`site_text\` ADD \`ticket_error_busy\` text DEFAULT 'You have sent several tickets in a short time. Please wait a while or email us directly.';`)

  // Content: the head office moved to Goba, Dar es Salaam (requested 2026-11-20).
  // Only text that still names Ifakara as the office/base is changed, so editors'
  // own wording is left alone and running this twice changes nothing.
  await moveHeadOffice({ payload, req })
}

const HQ = 'Goba, Dar es Salaam, Tanzania'
const FAQ_OLD = 'In Ifakara, Tanzania. We design, install and support our systems ourselves.'
const FAQ_NEW =
  'Our head office is in Goba, Dar es Salaam, Tanzania. We design, install and support our systems ourselves.'

type Block = { blockType: string; [k: string]: unknown }
type Office = { address?: string | null }
type Faq = { question?: string | null; answer?: string | null }

async function moveHeadOffice({ payload, req }: Pick<MigrateUpArgs, 'payload' | 'req'>) {
  const settings = await payload.findGlobal({ slug: 'settings', depth: 0, req })
  if (settings.address?.includes('Ifakara, Morogoro')) {
    await payload.updateGlobal({ slug: 'settings', data: { address: HQ }, depth: 0, req })
  }

  const { docs } = await payload.find({ collection: 'pages', depth: 0, limit: 100, pagination: false, req })
  for (const page of docs) {
    let changed = false
    const layout = ((page.layout ?? []) as Block[]).map((block) => {
      if (block.blockType === 'contact' && Array.isArray(block.offices)) {
        const offices = (block.offices as Office[]).map((o) => {
          if (o.address?.trim() !== 'Ifakara, Morogoro, Tanzania') return o
          changed = true
          return { ...o, address: HQ }
        })
        return { ...block, offices }
      }
      if (block.blockType === 'faq' && Array.isArray(block.items)) {
        const items = (block.items as Faq[]).map((i) => {
          if (i.answer?.trim() !== FAQ_OLD) return i
          changed = true
          return { ...i, answer: FAQ_NEW }
        })
        return { ...block, items }
      }
      return block
    })
    if (changed) {
      await payload.update({
        collection: 'pages',
        id: page.id,
        data: { layout: layout as typeof page.layout },
        depth: 0,
        req,
      })
    }
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`tickets\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`products_id\` integer,
  	\`posts_id\` integer,
  	\`media_id\` integer,
  	\`inquiries_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`inquiries_id\`) REFERENCES \`inquiries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "pages_id", "products_id", "posts_id", "media_id", "inquiries_id", "users_id") SELECT "id", "order", "parent_id", "path", "pages_id", "products_id", "posts_id", "media_id", "inquiries_id", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_inquiries_id_idx\` ON \`payload_locked_documents_rels\` (\`inquiries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`site_text\` DROP COLUMN \`ticket_heading\`;`)
  await db.run(sql`ALTER TABLE \`site_text\` DROP COLUMN \`ticket_intro\`;`)
  await db.run(sql`ALTER TABLE \`site_text\` DROP COLUMN \`ticket_email\`;`)
  await db.run(sql`ALTER TABLE \`site_text\` DROP COLUMN \`ticket_phone\`;`)
  await db.run(sql`ALTER TABLE \`site_text\` DROP COLUMN \`ticket_product\`;`)
  await db.run(sql`ALTER TABLE \`site_text\` DROP COLUMN \`ticket_other_product\`;`)
  await db.run(sql`ALTER TABLE \`site_text\` DROP COLUMN \`ticket_account\`;`)
  await db.run(sql`ALTER TABLE \`site_text\` DROP COLUMN \`ticket_subject\`;`)
  await db.run(sql`ALTER TABLE \`site_text\` DROP COLUMN \`ticket_description\`;`)
  await db.run(sql`ALTER TABLE \`site_text\` DROP COLUMN \`ticket_send\`;`)
  await db.run(sql`ALTER TABLE \`site_text\` DROP COLUMN \`ticket_sending\`;`)
  await db.run(sql`ALTER TABLE \`site_text\` DROP COLUMN \`ticket_success\`;`)
  await db.run(sql`ALTER TABLE \`site_text\` DROP COLUMN \`ticket_success_copy\`;`)
  await db.run(sql`ALTER TABLE \`site_text\` DROP COLUMN \`ticket_error_subject\`;`)
  await db.run(sql`ALTER TABLE \`site_text\` DROP COLUMN \`ticket_error_description\`;`)
  await db.run(sql`ALTER TABLE \`site_text\` DROP COLUMN \`ticket_error_busy\`;`)
}
