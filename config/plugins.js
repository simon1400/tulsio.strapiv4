module.exports = {
  meilisearch: {
    config: {
      host: "http://localhost:7700",
      apiKey: process.env.MEILISEARCH_TOKEN,
      article: {
        indexName: process.env.MEILISEARCH_PREFIX+'article',
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
      faq: {
        indexName: process.env.MEILISEARCH_PREFIX+'faq',
        settings: {
          searchableAttributes: ['title', 'answer']
        }
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
