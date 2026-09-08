export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'latestLeftImage',
      title: 'Latest from VNH - Left Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'latestRightImage',
      title: 'Latest from VNH - Right Image',
      type: 'image',
      options: { hotspot: true }
    }
  ],
  preview: {
    prepare() {
      return { title: 'VNH Home Page' };
    }
  }
};
