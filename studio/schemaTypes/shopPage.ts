import {defineField, defineType} from 'sanity'

export const shopPage = defineType({
  name: 'shopPage',
  title: 'Shop Page',
  type: 'document',
  groups: [
    {name: 'seo', title: 'SEO'},
    {name: 'hero', title: 'Hero', default: true},
    {name: 'collections', title: 'Placeholder Collections'}
  ],
  fields: [
    defineField({name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo', initialValue: 'Shop VNH | Products, Stickers, Collectibles & More'}),
    defineField({name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3, group: 'seo', initialValue: 'Shop VNH products, stickers, collectibles, apparel, and new releases built around practical ideas and real-world use.'}),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Shop'}),
    defineField({name: 'heading', title: 'Heading', type: 'string', group: 'hero', initialValue: 'Built for Real Use'}),
    defineField({name: 'intro', title: 'Intro', type: 'text', rows: 3, group: 'hero', initialValue: 'The storefront is being prepared for Shopify. Products will appear here once the catalog connection is configured.'}),
    defineField({name: 'card1Title', title: 'Card 1 Title', type: 'string', group: 'collections', initialValue: 'Stickers'}),
    defineField({name: 'card1Body', title: 'Card 1 Body', type: 'string', group: 'collections', initialValue: 'VNH branded designs and releases.'}),
    defineField({name: 'card2Title', title: 'Card 2 Title', type: 'string', group: 'collections', initialValue: 'Coins'}),
    defineField({name: 'card2Body', title: 'Card 2 Body', type: 'string', group: 'collections', initialValue: 'Collectible VNH challenge coins.'}),
    defineField({name: 'card3Title', title: 'Card 3 Title', type: 'string', group: 'collections', initialValue: 'Apparel'}),
    defineField({name: 'card3Body', title: 'Card 3 Body', type: 'string', group: 'collections', initialValue: 'Coming as the catalog expands.'}),
    defineField({name: 'card4Title', title: 'Card 4 Title', type: 'string', group: 'collections', initialValue: 'More'}),
    defineField({name: 'card4Body', title: 'Card 4 Body', type: 'string', group: 'collections', initialValue: 'New products and useful items in development.'})
  ],
  preview: {prepare: () => ({title: 'VNH Shop Page'})}
})
