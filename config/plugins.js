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
        transformEntry({ entry }) {
          return {
            ...entry,
            question: entry.faq.map(item => item.question),
            answer: entry.faq.map(item => item.answer)
          }
        },
        settings: {
          searchableAttributes: ['question', 'answer']
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
  }
}
