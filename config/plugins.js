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
            chaptersTitles: entry.chapters.map(item => item.title),
            chaptersText: entry.chapters.map(item => item.text)
          }
        },
        settings: {
          searchableAttributes: [
            'title',
            "chaptersTitles",
            "chaptersText",
            'categoryTitles',
            'perex',
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
      defaultLimit: 100,
      depthLimit: 100,
      maxLimit: 100,
    }
  },
  'drag-drop-content-types': {
    enabled: true
  }
}
