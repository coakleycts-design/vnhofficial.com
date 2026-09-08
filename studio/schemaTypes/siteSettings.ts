import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'VNH Logo',
      description: 'Used in the header, footer, hero, favicon fallback, and structured data.',
      type: 'file',
      options: {accept: 'image/svg+xml,image/png,image/jpeg,image/webp'}
    }),
    defineField({
      name: 'topoBackground',
      title: 'Site Topography Background',
      description: 'Site-wide background artwork. SVG is preferred for crisp contour lines.',
      type: 'file',
      options: {accept: 'image/svg+xml,image/png,image/jpeg,image/webp'}
    }),
    defineField({
      name: 'socialShareImage',
      title: 'Social / Search Share Image',
      description: 'Recommended: 1200 × 630. Used for Open Graph and social previews.',
      type: 'image',
      options: {hotspot: true}
    })
  ],
  preview: {
    prepare() {
      return {title: 'VNH Site Settings'}
    }
  }
})
