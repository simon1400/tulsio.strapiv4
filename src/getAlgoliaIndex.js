const algoliasearch = require("algoliasearch");

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

const getAlgoliaIndex = (name) => {
  const index = client.initIndex(`tulsio_${name}`);
  return index;
};

module.exports = getAlgoliaIndex;
