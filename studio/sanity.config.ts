import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'iec4sn1b'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

const singletonTypes = new Set(['siteSettings', 'homePage', 'missionPage', 'contactPage', 'shopPage'])

const singletonItem = (S: any, title: string, schemaType: string) =>
  S.listItem()
    .title(title)
    .id(schemaType)
    .child(S.document().schemaType(schemaType).documentId(schemaType))

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
            singletonItem(S, 'Site Settings', 'siteSettings'),
            singletonItem(S, 'Home Page', 'homePage'),
            singletonItem(S, 'Mission Page', 'missionPage'),
            singletonItem(S, 'Contact Page', 'contactPage'),
            singletonItem(S, 'Shop Page', 'shopPage')
          ])
    }),
    visionTool()
  ],
  schema: {types: schemaTypes},
  document: {
    newDocumentOptions: (prev) => prev.filter((item) => !singletonTypes.has(item.templateId)),
    actions: (prev, context) =>
      singletonTypes.has(context.schemaType)
        ? prev.filter(({action}) => action !== 'duplicate' && action !== 'delete')
        : prev
  }
})
