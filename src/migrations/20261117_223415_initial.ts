import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_highlights\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`url\` text,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_highlights_order_idx\` ON \`pages_blocks_hero_highlights\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_highlights_parent_id_idx\` ON \`pages_blocks_hero_highlights\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_tags_order_idx\` ON \`pages_blocks_hero_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_tags_parent_id_idx\` ON \`pages_blocks_hero_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text NOT NULL,
  	\`subheading\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_url\` text,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_url\` text,
  	\`image_id\` integer,
  	\`secondary_image_id\` integer,
  	\`inset_title\` text,
  	\`inset_text\` text,
  	\`inset_image_id\` integer,
  	\`stat_value\` text,
  	\`stat_label\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`secondary_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`inset_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_order_idx\` ON \`pages_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_parent_id_idx\` ON \`pages_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_path_idx\` ON \`pages_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_image_idx\` ON \`pages_blocks_hero\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_secondary_image_idx\` ON \`pages_blocks_hero\` (\`secondary_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_inset_inset_image_idx\` ON \`pages_blocks_hero\` (\`inset_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_page_header\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text NOT NULL,
  	\`subheading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_page_header_order_idx\` ON \`pages_blocks_page_header\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_page_header_parent_id_idx\` ON \`pages_blocks_page_header\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_page_header_path_idx\` ON \`pages_blocks_page_header\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_logos_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`image_id\` integer,
  	\`url\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_logos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_logos_logos_order_idx\` ON \`pages_blocks_logos_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logos_logos_parent_id_idx\` ON \`pages_blocks_logos_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logos_logos_image_idx\` ON \`pages_blocks_logos_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_logos_order_idx\` ON \`pages_blocks_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logos_parent_id_idx\` ON \`pages_blocks_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logos_path_idx\` ON \`pages_blocks_logos\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`anchor\` text,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`image_id\` integer,
  	\`image_on_left\` integer DEFAULT false,
  	\`cta_label\` text,
  	\`cta_url\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_order_idx\` ON \`pages_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_parent_id_idx\` ON \`pages_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_path_idx\` ON \`pages_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_image_idx\` ON \`pages_blocks_content\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_intro_accordion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_intro_accordion\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_intro_accordion_items_order_idx\` ON \`pages_blocks_intro_accordion_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_intro_accordion_items_parent_id_idx\` ON \`pages_blocks_intro_accordion_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_intro_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`anchor\` text,
  	\`heading_muted\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`link_card_lead\` text,
  	\`link_card_title\` text,
  	\`link_card_url\` text,
  	\`link_card_image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`link_card_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_intro_accordion_order_idx\` ON \`pages_blocks_intro_accordion\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_intro_accordion_parent_id_idx\` ON \`pages_blocks_intro_accordion\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_intro_accordion_path_idx\` ON \`pages_blocks_intro_accordion\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_intro_accordion_link_card_link_card_image_idx\` ON \`pages_blocks_intro_accordion\` (\`link_card_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_bento_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text,
  	\`link_label\` text,
  	\`link_url\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_bento\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_bento_slides_order_idx\` ON \`pages_blocks_bento_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_bento_slides_parent_id_idx\` ON \`pages_blocks_bento_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_bento_slides_image_idx\` ON \`pages_blocks_bento_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_bento_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'fact' NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	\`text\` text,
  	\`image_id\` integer,
  	\`link_label\` text,
  	\`link_url\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_bento\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_bento_cards_order_idx\` ON \`pages_blocks_bento_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_bento_cards_parent_id_idx\` ON \`pages_blocks_bento_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_bento_cards_image_idx\` ON \`pages_blocks_bento_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_bento\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`anchor\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_bento_order_idx\` ON \`pages_blocks_bento\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_bento_parent_id_idx\` ON \`pages_blocks_bento\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_bento_path_idx\` ON \`pages_blocks_bento\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_product_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`anchor\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_product_cards_order_idx\` ON \`pages_blocks_product_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_product_cards_parent_id_idx\` ON \`pages_blocks_product_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_product_cards_path_idx\` ON \`pages_blocks_product_cards\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_spotlight_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text NOT NULL,
  	\`text\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_spotlight\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_spotlight_features_order_idx\` ON \`pages_blocks_spotlight_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_spotlight_features_parent_id_idx\` ON \`pages_blocks_spotlight_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_spotlight_features_image_idx\` ON \`pages_blocks_spotlight_features\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_spotlight\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`anchor\` text,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`image_id\` integer,
  	\`image_on_left\` integer DEFAULT false,
  	\`cta_label\` text,
  	\`cta_url\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_spotlight_order_idx\` ON \`pages_blocks_spotlight\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_spotlight_parent_id_idx\` ON \`pages_blocks_spotlight\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_spotlight_path_idx\` ON \`pages_blocks_spotlight\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_spotlight_image_idx\` ON \`pages_blocks_spotlight\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_steps_order_idx\` ON \`pages_blocks_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_steps_parent_id_idx\` ON \`pages_blocks_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`anchor\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_order_idx\` ON \`pages_blocks_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_parent_id_idx\` ON \`pages_blocks_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_path_idx\` ON \`pages_blocks_steps\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_stats_order_idx\` ON \`pages_blocks_stats_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_stats_parent_id_idx\` ON \`pages_blocks_stats_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`anchor\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`image_id\` integer,
  	\`cta_label\` text,
  	\`cta_url\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_order_idx\` ON \`pages_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_parent_id_idx\` ON \`pages_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_path_idx\` ON \`pages_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_image_idx\` ON \`pages_blocks_stats\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cards_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cards_cards_order_idx\` ON \`pages_blocks_cards_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cards_cards_parent_id_idx\` ON \`pages_blocks_cards_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`anchor\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`image_id\` integer,
  	\`cta_label\` text,
  	\`cta_url\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cards_order_idx\` ON \`pages_blocks_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cards_parent_id_idx\` ON \`pages_blocks_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cards_path_idx\` ON \`pages_blocks_cards\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cards_image_idx\` ON \`pages_blocks_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`organization\` text,
  	\`photo_id\` integer,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_items_order_idx\` ON \`pages_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_items_parent_id_idx\` ON \`pages_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_items_photo_idx\` ON \`pages_blocks_testimonials_items\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_order_idx\` ON \`pages_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_parent_id_idx\` ON \`pages_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_path_idx\` ON \`pages_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_latest_news\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`count\` numeric DEFAULT 3,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_latest_news_order_idx\` ON \`pages_blocks_latest_news\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_latest_news_parent_id_idx\` ON \`pages_blocks_latest_news\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_latest_news_path_idx\` ON \`pages_blocks_latest_news\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`text\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_url\` text,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_url\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_order_idx\` ON \`pages_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_parent_id_idx\` ON \`pages_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_path_idx\` ON \`pages_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_timeline_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`year\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_timeline\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_timeline_events_order_idx\` ON \`pages_blocks_timeline_events\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_timeline_events_parent_id_idx\` ON \`pages_blocks_timeline_events\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_timeline\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`body\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_timeline_order_idx\` ON \`pages_blocks_timeline\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_timeline_parent_id_idx\` ON \`pages_blocks_timeline\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_timeline_path_idx\` ON \`pages_blocks_timeline\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_mission_values\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_mission\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_mission_values_order_idx\` ON \`pages_blocks_mission_values\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_mission_values_parent_id_idx\` ON \`pages_blocks_mission_values\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_mission\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mission\` text,
  	\`vision\` text,
  	\`values_heading\` text DEFAULT 'What we stand for',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_mission_order_idx\` ON \`pages_blocks_mission\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_mission_parent_id_idx\` ON \`pages_blocks_mission\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_mission_path_idx\` ON \`pages_blocks_mission\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_team_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`photo_id\` integer,
  	\`bio\` text,
  	\`linkedin\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_team\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_members_order_idx\` ON \`pages_blocks_team_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_members_parent_id_idx\` ON \`pages_blocks_team_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_members_photo_idx\` ON \`pages_blocks_team_members\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_team\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_order_idx\` ON \`pages_blocks_team\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_parent_id_idx\` ON \`pages_blocks_team\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_path_idx\` ON \`pages_blocks_team\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_items_order_idx\` ON \`pages_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_items_parent_id_idx\` ON \`pages_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`cta_label\` text,
  	\`cta_url\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_order_idx\` ON \`pages_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_parent_id_idx\` ON \`pages_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_path_idx\` ON \`pages_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_interests\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_interests_order_idx\` ON \`pages_blocks_contact_interests\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_interests_parent_id_idx\` ON \`pages_blocks_contact_interests\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_offices\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`address\` text,
  	\`phone\` text,
  	\`email\` text,
  	\`hours\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_offices_order_idx\` ON \`pages_blocks_contact_offices\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_offices_parent_id_idx\` ON \`pages_blocks_contact_offices\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`text\` text,
  	\`map_embed_url\` text,
  	\`success_message\` text DEFAULT 'Thank you! We''ve received your message and will be in touch soon.',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_order_idx\` ON \`pages_blocks_contact\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_parent_id_idx\` ON \`pages_blocks_contact\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_path_idx\` ON \`pages_blocks_contact\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`seo_og_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_seo_seo_og_image_idx\` ON \`pages\` (\`seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`products_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_products_id_idx\` ON \`pages_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`products_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text NOT NULL,
  	\`text\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_features_order_idx\` ON \`products_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_features_parent_id_idx\` ON \`products_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_features_image_idx\` ON \`products_features\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`products_journeys_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_journeys\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_journeys_steps_order_idx\` ON \`products_journeys_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_journeys_steps_parent_id_idx\` ON \`products_journeys_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_journeys\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`image_id\` integer,
  	\`card_on_right\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_journeys_order_idx\` ON \`products_journeys\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_journeys_parent_id_idx\` ON \`products_journeys\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_journeys_image_idx\` ON \`products_journeys\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`products_specs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_specs_order_idx\` ON \`products_specs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_specs_parent_id_idx\` ON \`products_specs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_use_cases\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_use_cases_order_idx\` ON \`products_use_cases\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_use_cases_parent_id_idx\` ON \`products_use_cases\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_faqs_order_idx\` ON \`products_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_faqs_parent_id_idx\` ON \`products_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	\`icon\` text,
  	\`tagline\` text,
  	\`short_description\` text NOT NULL,
  	\`hero_image_id\` integer,
  	\`hero_secondary_image_id\` integer,
  	\`overview\` text,
  	\`news_category\` text,
  	\`brochure_id\` integer,
  	\`cta_label\` text DEFAULT 'Request a quote',
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`seo_og_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_secondary_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`brochure_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_slug_idx\` ON \`products\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`products_hero_image_idx\` ON \`products\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`products_hero_secondary_image_idx\` ON \`products\` (\`hero_secondary_image_id\`);`)
  await db.run(sql`CREATE INDEX \`products_brochure_idx\` ON \`products\` (\`brochure_id\`);`)
  await db.run(sql`CREATE INDEX \`products_seo_seo_og_image_idx\` ON \`products\` (\`seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`products_updated_at_idx\` ON \`products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`products_created_at_idx\` ON \`products\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`products_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_rels_order_idx\` ON \`products_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_parent_idx\` ON \`products_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_path_idx\` ON \`products_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_media_id_idx\` ON \`products_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`published_at\` text NOT NULL,
  	\`category\` text DEFAULT 'company' NOT NULL,
  	\`author\` text,
  	\`excerpt\` text NOT NULL,
  	\`cover_image_id\` integer,
  	\`body\` text,
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`seo_og_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_cover_image_idx\` ON \`posts\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_seo_seo_og_image_idx\` ON \`posts\` (\`seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_large_url\` text,
  	\`sizes_large_width\` numeric,
  	\`sizes_large_height\` numeric,
  	\`sizes_large_mime_type\` text,
  	\`sizes_large_filesize\` numeric,
  	\`sizes_large_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_large_sizes_large_filename_idx\` ON \`media\` (\`sizes_large_filename\`);`)
  await db.run(sql`CREATE TABLE \`inquiries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`phone\` text,
  	\`email\` text,
  	\`organization\` text,
  	\`interest\` text,
  	\`message\` text NOT NULL,
  	\`status\` text DEFAULT 'new',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`inquiries_updated_at_idx\` ON \`inquiries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`inquiries_created_at_idx\` ON \`inquiries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
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
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_inquiries_id_idx\` ON \`payload_locked_documents_rels\` (\`inquiries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`settings_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`settings_social_links_order_idx\` ON \`settings_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`settings_social_links_parent_id_idx\` ON \`settings_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`site_name\` text DEFAULT 'Click Group' NOT NULL,
  	\`tagline\` text,
  	\`default_description\` text,
  	\`logo_id\` integer,
  	\`logo_dark_id\` integer,
  	\`contact_email\` text,
  	\`phone\` text,
  	\`whatsapp\` text,
  	\`address\` text,
  	\`announcement_bar_enabled\` integer DEFAULT false,
  	\`announcement_bar_text\` text,
  	\`announcement_bar_url\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`logo_dark_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`settings_logo_idx\` ON \`settings\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`settings_logo_dark_idx\` ON \`settings\` (\`logo_dark_id\`);`)
  await db.run(sql`CREATE TABLE \`header_items_children\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_items_children_order_idx\` ON \`header_items_children\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_items_children_parent_id_idx\` ON \`header_items_children\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_items_order_idx\` ON \`header_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_items_parent_id_idx\` ON \`header_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`cta_button_label\` text,
  	\`cta_button_url\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_links_order_idx\` ON \`footer_columns_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_links_parent_id_idx\` ON \`footer_columns_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_order_idx\` ON \`footer_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_parent_id_idx\` ON \`footer_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_legal_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_legal_links_order_idx\` ON \`footer_legal_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_legal_links_parent_id_idx\` ON \`footer_legal_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`cta_heading\` text,
  	\`cta_label\` text,
  	\`cta_url\` text,
  	\`about\` text,
  	\`copyright\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`site_text\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`product_breadcrumb\` text DEFAULT 'Solutions',
  	\`product_how_it_works_button\` text DEFAULT 'How it works',
  	\`product_what_it_does\` text DEFAULT 'What {name} does',
  	\`product_how_it_works\` text DEFAULT 'How it works',
  	\`product_specifications\` text DEFAULT 'Specifications',
  	\`product_who_its_for\` text DEFAULT 'Who it''s for',
  	\`product_news\` text DEFAULT '{name} news and guides',
  	\`product_faq\` text DEFAULT '{name} questions',
  	\`product_brochure\` text DEFAULT 'Brochure',
  	\`news_page_heading\` text DEFAULT 'News and updates',
  	\`news_page_intro\` text DEFAULT 'Product news and guides from the Click Group team.',
  	\`news_meta_description\` text DEFAULT 'The latest from Click Group: Click Meter, healthcare and company news.',
  	\`news_empty\` text DEFAULT 'No news yet. Check back soon.',
  	\`news_read_article\` text DEFAULT 'Read article',
  	\`news_all_news\` text DEFAULT 'All news',
  	\`footer_contact_heading\` text DEFAULT 'Contact',
  	\`form_name\` text DEFAULT 'Name',
  	\`form_phone\` text DEFAULT 'Phone',
  	\`form_email\` text DEFAULT 'Email',
  	\`form_organization\` text DEFAULT 'Organization',
  	\`form_interest\` text DEFAULT 'I''m interested in',
  	\`form_message\` text DEFAULT 'Message',
  	\`form_send\` text DEFAULT 'Send message',
  	\`form_sending\` text DEFAULT 'Sending…',
  	\`form_error_name\` text DEFAULT 'Please enter your name.',
  	\`form_error_contact\` text DEFAULT 'Please give a phone number or email so we can reply.',
  	\`form_error_email\` text DEFAULT 'Please enter a valid email.',
  	\`form_error_message\` text DEFAULT 'Please tell us a little about what you need.',
  	\`form_error_server\` text DEFAULT 'Something went wrong. Please try again or contact us by phone or email.',
  	\`not_found_heading\` text DEFAULT 'Page not found',
  	\`not_found_text\` text DEFAULT 'The page you''re looking for doesn''t exist or has moved.',
  	\`not_found_button\` text DEFAULT 'Back to home',
  	\`general_faq_heading\` text DEFAULT 'Frequently asked questions',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_hero_highlights\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_tags\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_page_header\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_logos_logos\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_logos\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_intro_accordion_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_intro_accordion\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_bento_slides\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_bento_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_bento\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_product_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_spotlight_features\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_spotlight\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cards_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_latest_news\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_timeline_events\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_timeline\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_mission_values\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_mission\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_team_members\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_team\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_interests\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_offices\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`products_features\`;`)
  await db.run(sql`DROP TABLE \`products_journeys_steps\`;`)
  await db.run(sql`DROP TABLE \`products_journeys\`;`)
  await db.run(sql`DROP TABLE \`products_specs\`;`)
  await db.run(sql`DROP TABLE \`products_use_cases\`;`)
  await db.run(sql`DROP TABLE \`products_faqs\`;`)
  await db.run(sql`DROP TABLE \`products\`;`)
  await db.run(sql`DROP TABLE \`products_rels\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`inquiries\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`settings_social_links\`;`)
  await db.run(sql`DROP TABLE \`settings\`;`)
  await db.run(sql`DROP TABLE \`header_items_children\`;`)
  await db.run(sql`DROP TABLE \`header_items\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_links\`;`)
  await db.run(sql`DROP TABLE \`footer_columns\`;`)
  await db.run(sql`DROP TABLE \`footer_legal_links\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`site_text\`;`)
}
