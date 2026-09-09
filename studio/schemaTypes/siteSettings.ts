import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {name: 'brand', title: 'Brand & Navigation', default: true},
    {name: 'media', title: 'Media'},
    {name: 'footer', title: 'Footer'}
  ],
  fields: [
    defineField({name: 'brandName', title: 'Brand Name', type: 'string', group: 'brand', initialValue: 'VNH'}),
    defineField({name: 'brandTagline', title: 'Brand Tagline', type: 'string', group: 'brand', initialValue: 'Engineered Design'}),
    defineField({name: 'navShopLabel', title: 'Shop Navigation Label', type: 'string', group: 'brand', initialValue: 'Shop'}),
    defineField({name: 'navMissionLabel', title: 'Mission Navigation Label', type: 'string', group: 'brand', initialValue: 'Mission'}),
    defineField({name: 'navContactLabel', title: 'Contact Navigation Label', type: 'string', group: 'brand', initialValue: 'Contact'}),
    defineField({name: 'browseShopAriaLabel', title: 'Shop Icon Accessibility Label', type: 'string', group: 'brand', initialValue: 'Browse shop'}),
    defineField({name: 'accountAriaLabel', title: 'Account Icon Accessibility Label', type: 'string', group: 'brand', initialValue: 'Account'}),
    defineField({name: 'cartAriaLabel', title: 'Cart Icon Accessibility Label', type: 'string', group: 'brand', initialValue: 'Cart'}),
    defineField({
      name: 'logo',
      title: 'VNH Logo',
      description: 'Used in the header, footer, hero, favicon fallback, and structured data.',
      type: 'file',
      group: 'media',
      options: {accept: 'image/svg+xml,image/png,image/jpeg,image/webp'}
    }),
    defineField({
      name: 'topoBackground',
      title: 'Site Topography Background',
      description: 'Site-wide background artwork. SVG is preferred for crisp contour lines.',
      type: 'file',
      group: 'media',
      options: {accept: 'image/svg+xml,image/png,image/jpeg,image/webp'}
    }),
    defineField({
      name: 'socialShareImage',
      title: 'Social / Search Share Image',
      description: 'Recommended: 1200 × 630. Used for Open Graph and social previews.',
      type: 'image',
      group: 'media',
      options: {hotspot: true}
    }),
    defineField({name: 'footerText', title: 'Footer Text', type: 'string', group: 'footer', initialValue: 'VNH Engineered Design'}),
    defineField({name: 'footerShopLabel', title: 'Footer Shop Label', type: 'string', group: 'footer', initialValue: 'Shop'}),
    defineField({name: 'footerMissionLabel', title: 'Footer Mission Label', type: 'string', group: 'footer', initialValue: 'Mission'}),
    defineField({name: 'footerContactLabel', title: 'Footer Contact Label', type: 'string', group: 'footer', initialValue: 'Contact'})
  ],
  preview: {
    prepare() {
      return {title: 'VNH Site Settings'}
    }
  }
})
