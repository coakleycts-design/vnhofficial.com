import {defineField, defineType} from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  groups: [
    {name: 'seo', title: 'SEO'},
    {name: 'hero', title: 'Hero', default: true},
    {name: 'form', title: 'Form Copy'},
    {name: 'messages', title: 'Form Messages'}
  ],
  fields: [
    defineField({name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo', initialValue: 'Contact VNH | Questions, Orders & Partnerships'}),
    defineField({name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3, group: 'seo', initialValue: 'Contact VNH for general questions, order support, product questions, partnerships, or media inquiries.'}),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Contact'}),
    defineField({name: 'heading', title: 'Heading', type: 'string', group: 'hero', initialValue: 'Get in Touch'}),
    defineField({name: 'intro', title: 'Intro', type: 'text', rows: 3, group: 'hero', initialValue: 'Questions, ideas, order support, or something we should know? Send us a message.'}),

    defineField({name: 'nameLabel', title: 'Name Label / Placeholder', type: 'string', group: 'form', initialValue: 'Name'}),
    defineField({name: 'emailLabel', title: 'Email Label / Placeholder', type: 'string', group: 'form', initialValue: 'Email address'}),
    defineField({name: 'orderLabel', title: 'Order Number Accessibility Label', type: 'string', group: 'form', initialValue: 'Order number'}),
    defineField({name: 'orderPlaceholder', title: 'Order Number Placeholder', type: 'string', group: 'form', initialValue: 'Order number (optional)'}),
    defineField({name: 'topicLabel', title: 'Topic Accessibility Label', type: 'string', group: 'form', initialValue: 'Topic'}),
    defineField({name: 'topicPlaceholder', title: 'Topic Placeholder', type: 'string', group: 'form', initialValue: 'Select a topic'}),
    defineField({name: 'topicGeneral', title: 'Topic — General Question', type: 'string', group: 'form', initialValue: 'General question'}),
    defineField({name: 'topicOrder', title: 'Topic — Order Support', type: 'string', group: 'form', initialValue: 'Order support'}),
    defineField({name: 'topicProduct', title: 'Topic — Product Question', type: 'string', group: 'form', initialValue: 'Product question'}),
    defineField({name: 'topicPartnership', title: 'Topic — Partnership / Media', type: 'string', group: 'form', initialValue: 'Partnership or media'}),
    defineField({name: 'messageLabel', title: 'Message Label / Placeholder', type: 'string', group: 'form', initialValue: 'Message'}),
    defineField({name: 'submitLabel', title: 'Submit Button Label', type: 'string', group: 'form', initialValue: 'Send Message'}),

    defineField({name: 'sendingMessage', title: 'Sending Message', type: 'string', group: 'messages', initialValue: 'Sending…'}),
    defineField({name: 'successMessage', title: 'Success Message', type: 'string', group: 'messages', initialValue: 'Message sent. We’ll be in touch.'}),
    defineField({name: 'errorMessage', title: 'Error Fallback Message', type: 'string', group: 'messages', initialValue: 'Something went wrong. Please try again.'})
  ],
  preview: {prepare: () => ({title: 'VNH Contact Page'})}
})
