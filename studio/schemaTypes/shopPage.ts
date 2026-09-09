import {defineField, defineType} from 'sanity'

export const shopPage = defineType({
  name: 'shopPage',
  title: 'Shop Page',
  type: 'document',
  groups: [
    {name: 'seo', title: 'SEO'},
    {name: 'hero', title: 'Hero', default: true},
    {name: 'storefront', title: 'Live Storefront'},
    {name: 'legacy', title: 'Legacy Placeholder Copy'}
  ],
  fields: [
    defineField({name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo', initialValue: 'Shop VNH | Products, Stickers, Collectibles & More'}),
    defineField({name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3, group: 'seo', initialValue: 'Shop VNH products, stickers, collectibles, apparel, and new releases built around practical ideas and real-world use.'}),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Shop'}),
    defineField({name: 'heading', title: 'Heading', type: 'string', group: 'hero', initialValue: 'Built for Real Use'}),
    defineField({name: 'intro', title: 'Intro', type: 'text', rows: 3, group: 'hero', initialValue: 'Shop VNH products and releases. Inventory and pricing are provided directly by our Shopify store.'}),

    defineField({name: 'productsHeading', title: 'Products Heading', type: 'string', group: 'storefront', initialValue: 'Current Products'}),
    defineField({name: 'searchPlaceholder', title: 'Search Placeholder', type: 'string', group: 'storefront', initialValue: 'Search products'}),
    defineField({name: 'categoryLabel', title: 'Category Label', type: 'string', group: 'storefront', initialValue: 'Category'}),
    defineField({name: 'allCategoriesLabel', title: 'All Categories Label', type: 'string', group: 'storefront', initialValue: 'All categories'}),
    defineField({name: 'availabilityLabel', title: 'Available Only Label', type: 'string', group: 'storefront', initialValue: 'Available only'}),
    defineField({name: 'sortLabel', title: 'Sort Label', type: 'string', group: 'storefront', initialValue: 'Sort'}),
    defineField({name: 'sortFeaturedLabel', title: 'Sort: Featured', type: 'string', group: 'storefront', initialValue: 'Featured'}),
    defineField({name: 'sortNewestLabel', title: 'Sort: Newest', type: 'string', group: 'storefront', initialValue: 'Newest'}),
    defineField({name: 'sortPriceLowLabel', title: 'Sort: Price Low to High', type: 'string', group: 'storefront', initialValue: 'Price: Low to high'}),
    defineField({name: 'sortPriceHighLabel', title: 'Sort: Price High to Low', type: 'string', group: 'storefront', initialValue: 'Price: High to low'}),
    defineField({name: 'sortNameLabel', title: 'Sort: Name', type: 'string', group: 'storefront', initialValue: 'Name'}),
    defineField({name: 'viewCartLabel', title: 'View Cart Label', type: 'string', group: 'storefront', initialValue: 'View cart'}),
    defineField({name: 'viewDetailsLabel', title: 'View Details Label', type: 'string', group: 'storefront', initialValue: 'View details'}),
    defineField({name: 'noResultsHeading', title: 'No Results Heading', type: 'string', group: 'storefront', initialValue: 'No products found'}),
    defineField({name: 'noResultsBody', title: 'No Results Message', type: 'string', group: 'storefront', initialValue: 'Try another search or clear a filter.'}),

    defineField({name: 'card1Title', title: 'Card 1 Title', type: 'string', group: 'legacy', initialValue: 'Stickers'}),
    defineField({name: 'card1Body', title: 'Card 1 Body', type: 'string', group: 'legacy', initialValue: 'VNH branded designs and releases.'}),
    defineField({name: 'card2Title', title: 'Card 2 Title', type: 'string', group: 'legacy', initialValue: 'Coins'}),
    defineField({name: 'card2Body', title: 'Card 2 Body', type: 'string', group: 'legacy', initialValue: 'Collectible VNH challenge coins.'}),
    defineField({name: 'card3Title', title: 'Card 3 Title', type: 'string', group: 'legacy', initialValue: 'Apparel'}),
    defineField({name: 'card3Body', title: 'Card 3 Body', type: 'string', group: 'legacy', initialValue: 'Coming as the catalog expands.'}),
    defineField({name: 'card4Title', title: 'Card 4 Title', type: 'string', group: 'legacy', initialValue: 'More'}),
    defineField({name: 'card4Body', title: 'Card 4 Body', type: 'string', group: 'legacy', initialValue: 'New products and useful items in development.'})
  ],
  preview: {prepare: () => ({title: 'VNH Shop Page'})}
})
