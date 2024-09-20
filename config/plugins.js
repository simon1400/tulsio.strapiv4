module.exports = ({ env }) => ({
  meilisearch: {
    config: {
      host: "http://localhost:7700",
      apiKey: env('MEILISEARCH_TOKEN'),
      article: {
        indexName: env('MEILISEARCH_PREFIX')+'article',
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
        indexName: env('MEILISEARCH_PREFIX')+'faq',
        settings: {
          searchableAttributes: ['title', 'answer']
        }
      },
    }
  },
  graphql: {
    enabled: true,
    config: {
      defaultLimit: 150,
      depthLimit: 150,
      maxLimit: 150,
    }
  },
  'drag-drop-content-types': {
    enabled: true
  },
  'preview-button': {
    config: {
      contentTypes: [
        {
          uid: 'api::article.article',
          published: {
            url: 'https://tulsio.com/blog/{slug}',
          },
        },
        {
          uid: 'api::article-base.article-base',
          published: {
            url: 'https://tulsio.com/{slug}',
          },
        },
      ],
    },
  }
})
