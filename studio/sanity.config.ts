import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'iec4sn1b'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

const singletonTypes = new Set(['siteSettings', 'homePage'])

export default defineConfig({
  name: 'vnh',
  title: 'VNH Studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('VNH Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage'))
          ])
    }),
    visionTool()
  ],
  schema: {types: schemaTypes},
  document: {
    newDocumentOptions: (prev) => prev.filter((item) => !singletonTypes.has(item.templateId)),
    actions: (prev, context) =>
      singletonTypes.has(context.schemaType)
        ? prev.filter(({action}) => action !== 'duplicate')
        : prev
  }
})
