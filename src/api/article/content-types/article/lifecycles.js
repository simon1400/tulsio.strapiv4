module.exports = {

  // async afterUpdate(entry, data) {
  //   const result = entry.result

  //   const { id } = result;
  //     // Query product added to database
  //   const article = await strapi.db.query('api::article.article').findOne({
  //     where: {
  //       id
  //     }
  //   })
  //   try {
  //     // Save the object to Algolia
  //     await index.partialUpdateObjects({
  //       objectID: result.id,
  //       title: result.title,
  //       chapters: result.chapters.map(item => ({
  //         title: item.title,
  //         text: item.text
  //       })),
  //       perex: result.perex
  //     });
  //     console.log("Object created in Algolia");
  //   } catch (error) {
  //     console.error("Error creating object in Algolia", error);
  //   }
  // },
};

// meilisearch: {
//   config: {
//     host: "http://localhost:7700",
//     apiKey: env('MEILISEARCH_TOKEN'),
//     article: {
//       indexName: env('MEILISEARCH_PREFIX')+'article',
//       transformEntry({ entry }) {
//         return {
//           ...entry,
//           categoryTitles: entry.categories.map(item => item.title),
//           chaptersTitles: entry.chapters.map(item => item.title),
//           chaptersText: entry.chapters.map(item => item.text)
//         }
//       },
//       settings: {
//         searchableAttributes: [
//           'title',
//           "chaptersTitles",
//           "chaptersText",
//           'categoryTitles',
//           'perex',
//           'slug'
//         ],
//       },
//     },
//     faq: {
//       indexName: env('MEILISEARCH_PREFIX')+'faq',
//       settings: {
//         searchableAttributes: ['title', 'answer']
//       }
//     },
//   }
// },
