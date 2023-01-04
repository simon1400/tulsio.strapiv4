module.exports = {
  meilisearch: {
    config: {
      article: {
        transformEntry({ entry }) {
          return {
            ...entry,
            categoryTitles: entry.categories.map(item => item.title),
          }
        },
        settings: {
          filterableAttributes: ['categoryTitles'],
          searchableAttributes: [
            'title',
            'categoryTitles',
            'slug'
          ],
        },
      },
      category: {
        settings: {
          searchableAttributes: ['title'],
        },
      },
      faq: {
        searchableAttributes: ['title', 'answer']
      },
    }
  },
  graphql: {
    enabled: true,
    config: {
      defaultLimit: 50,
      depthLimit: 50,
      maxLimit: 20,
    }
  },
  'drag-drop-content-types': {
    enabled: true
  }
}
