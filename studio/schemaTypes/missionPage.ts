import {defineField, defineType} from 'sanity'

export const missionPage = defineType({
  name: 'missionPage',
  title: 'Mission Page',
  type: 'document',
  groups: [
    {name: 'seo', title: 'SEO'},
    {name: 'hero', title: 'Hero', default: true},
    {name: 'content', title: 'Content'}
  ],
  fields: [
    defineField({name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo', initialValue: 'VNH Mission | Freedom Through Action'}),
    defineField({name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3, group: 'seo', initialValue: 'Learn why VNH focuses on practical products, useful ideas, personal responsibility, and freedom through action.'}),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Our Mission'}),
    defineField({name: 'heading', title: 'Heading', type: 'string', group: 'hero', initialValue: 'Freedom Through Action'}),
    defineField({name: 'intro', title: 'Intro', type: 'text', rows: 3, group: 'hero', initialValue: 'Real people. Real purpose. Useful ideas, personal responsibility, and practical solutions.'}),
    defineField({name: 'paragraph1', title: 'Paragraph 1', type: 'text', rows: 4, group: 'content', initialValue: 'VNH exists to create practical products, useful solutions, and original ideas for people who value freedom and responsibility.'}),
    defineField({name: 'paragraph2', title: 'Paragraph 2', type: 'text', rows: 4, group: 'content', initialValue: 'We are building this site as a place to discover new products, explore ideas, and stay up to date as VNH grows. The mission page will expand as the brand story and future programs are finalized.'}),
    defineField({name: 'ctaLabel', title: 'CTA Label', type: 'string', group: 'content', initialValue: 'Keep Updated'})
  ],
  preview: {prepare: () => ({title: 'VNH Mission Page'})}
})
