export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'VNH Logo',
      type: 'file',
      options: { accept: 'image/svg+xml,image/png,image/jpeg,image/webp' }
    },
    {
      name: 'topoBackground',
      title: 'Site Topography Background',
      type: 'file',
      options: { accept: 'image/svg+xml,image/png,image/jpeg,image/webp' }
    }
  ],
  preview: {
    prepare() {
      return { title: 'VNH Site Settings' };
    }
  }
};
