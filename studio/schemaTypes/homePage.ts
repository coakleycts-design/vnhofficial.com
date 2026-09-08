import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    {name: 'seo', title: 'SEO'},
    {name: 'hero', title: 'Hero', default: true},
    {name: 'values', title: 'Value Strip'},
    {name: 'mission', title: 'Mission Band'},
    {name: 'signup', title: 'Keep Updated'},
    {name: 'shop', title: 'Latest from VNH'}
  ],
  fields: [
    defineField({name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo', initialValue: 'VNH | Parts, Solutions, Ideas & Freedom'}),
    defineField({name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3, group: 'seo', initialValue: 'VNH creates practical products, useful solutions, and original ideas for people who value freedom and personal responsibility.'}),

    defineField({name: 'heroLine1', title: 'Hero Line 1', type: 'string', group: 'hero', initialValue: 'Parts'}),
    defineField({name: 'heroLine2', title: 'Hero Line 2', type: 'string', group: 'hero', initialValue: 'Solutions'}),
    defineField({name: 'heroLine3', title: 'Hero Line 3', type: 'string', group: 'hero', initialValue: 'Ideas'}),
    defineField({name: 'heroLine4', title: 'Hero Line 4', type: 'string', group: 'hero', initialValue: 'Freedom'}),
    defineField({name: 'heroTaglineLine1', title: 'Hero Tagline Line 1', type: 'string', group: 'hero', initialValue: 'Real People.'}),
    defineField({name: 'heroTaglineLine2', title: 'Hero Tagline Line 2', type: 'string', group: 'hero', initialValue: 'Real Purpose.'}),
    defineField({name: 'heroButtonLabel', title: 'Hero Button Label', type: 'string', group: 'hero', initialValue: 'Explore the Shop'}),

    defineField({name: 'value1Title', title: 'Value 1 Title', type: 'string', group: 'values', initialValue: 'Quality Parts'}),
    defineField({name: 'value1Subtitle', title: 'Value 1 Subtitle', type: 'string', group: 'values', initialValue: 'Built to last'}),
    defineField({name: 'value2Title', title: 'Value 2 Title', type: 'string', group: 'values', initialValue: 'Real Solutions'}),
    defineField({name: 'value2Subtitle', title: 'Value 2 Subtitle', type: 'string', group: 'values', initialValue: 'For everyday challenges'}),
    defineField({name: 'value3Title', title: 'Value 3 Title', type: 'string', group: 'values', initialValue: 'A Bigger Purpose'}),
    defineField({name: 'value3Subtitle', title: 'Value 3 Subtitle', type: 'string', group: 'values', initialValue: 'More than a purchase'}),

    defineField({name: 'missionEyebrow', title: 'Mission Eyebrow', type: 'string', group: 'mission', initialValue: 'Our Mission'}),
    defineField({name: 'missionHeading', title: 'Mission Heading', type: 'string', group: 'mission', initialValue: 'Freedom Through Action'}),
    defineField({name: 'missionButtonLabel', title: 'Mission Button Label', type: 'string', group: 'mission', initialValue: 'Learn More'}),
    defineField({name: 'missionSideLine1', title: 'Mission Side Line 1', type: 'string', group: 'mission', initialValue: 'Parts'}),
    defineField({name: 'missionSideLine2', title: 'Mission Side Line 2', type: 'string', group: 'mission', initialValue: 'Solutions'}),
    defineField({name: 'missionSideLine3', title: 'Mission Side Line 3', type: 'string', group: 'mission', initialValue: 'Ideas'}),
    defineField({name: 'missionSideLine4', title: 'Mission Side Line 4', type: 'string', group: 'mission', initialValue: 'Freedom'}),

    defineField({name: 'signupEyebrow', title: 'Signup Eyebrow', type: 'string', group: 'signup', initialValue: 'Keep Updated'}),
    defineField({name: 'signupHeading', title: 'Signup Heading', type: 'string', group: 'signup', initialValue: 'Stay in the Loop'}),
    defineField({name: 'signupBody', title: 'Signup Body', type: 'text', rows: 3, group: 'signup', initialValue: 'Get the latest on new products, updates, exclusive releases, and more.'}),
    defineField({name: 'signupEmailPlaceholder', title: 'Email Placeholder', type: 'string', group: 'signup', initialValue: 'Enter your email address'}),
    defineField({name: 'signupButtonLabel', title: 'Signup Button Label', type: 'string', group: 'signup', initialValue: 'Keep Me Updated'}),
    defineField({name: 'signupNote', title: 'Signup Note', type: 'string', group: 'signup', initialValue: 'No spam. Just what matters.'}),
    defineField({name: 'signupSending', title: 'Signup Sending Message', type: 'string', group: 'signup', initialValue: 'Signing you up…'}),
    defineField({name: 'signupSuccess', title: 'Signup Success Message', type: 'string', group: 'signup', initialValue: 'You’re on the list. Watch your inbox.'}),
    defineField({name: 'signupError', title: 'Signup Error Fallback', type: 'string', group: 'signup', initialValue: 'Something went wrong. Please try again.'}),
    defineField({name: 'signupSideLine1', title: 'Signup Side Line 1', type: 'string', group: 'signup', initialValue: 'Ideas Today'}),
    defineField({name: 'signupSideLine2', title: 'Signup Side Line 2', type: 'string', group: 'signup', initialValue: 'A Stronger'}),
    defineField({name: 'signupSideLine3', title: 'Signup Side Line 3', type: 'string', group: 'signup', initialValue: 'Tomorrow'}),

    defineField({name: 'shopEyebrow', title: 'Shop Eyebrow', type: 'string', group: 'shop', initialValue: 'Shop'}),
    defineField({name: 'shopHeading', title: 'Shop Heading', type: 'string', group: 'shop', initialValue: 'Latest from VNH'}),
    defineField({name: 'latestLeftAlt', title: 'Left Image Alt Text', type: 'string', group: 'shop', initialValue: 'VNH 3D printed model'}),
    defineField({name: 'latestRightAlt', title: 'Right Image Alt Text', type: 'string', group: 'shop', initialValue: 'VNH sticker collection'}),
    defineField({
      name: 'latestLeftImage',
      title: 'Latest from VNH — Left Image',
      description: 'Square or landscape images work best in the split product block.',
      type: 'image',
      group: 'shop',
      options: {hotspot: true}
    }),
    defineField({
      name: 'latestRightImage',
      title: 'Latest from VNH — Right Image',
      description: 'Square or landscape images work best in the split product block.',
      type: 'image',
      group: 'shop',
      options: {hotspot: true}
    })
  ],
  preview: {
    prepare() {
      return {title: 'VNH Home Page'}
    }
  }
})
