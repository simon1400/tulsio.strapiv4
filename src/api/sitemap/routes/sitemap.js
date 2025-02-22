module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom-sitemap",
      handler: "sitemap.getSitemap",
      config: {
        auth: false, // Открытый доступ
      },
    },
  ],
};
