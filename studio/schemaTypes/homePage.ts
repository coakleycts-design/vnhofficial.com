import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'latestLeftImage',
      title: 'Latest from VNH — Left Image',
      description: 'Square or landscape images work best in the split product block.',
      type: 'image',
      options: {hotspot: true}
    }),
    defineField({
      name: 'latestRightImage',
      title: 'Latest from VNH — Right Image',
      description: 'Square or landscape images work best in the split product block.',
      type: 'image',
      options: {hotspot: true}
    })
  ],
  preview: {
    prepare() {
      return {title: 'VNH Home Page'}
    }
  }
})
