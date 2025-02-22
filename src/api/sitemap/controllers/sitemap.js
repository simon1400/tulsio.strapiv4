const fs = require("fs");
const path = require("path");

module.exports = {
  async getSitemap(ctx) {
    try {
      const sitemapPath = path.join(strapi.dirs.public, "sitemap/index.xml");

      if (!fs.existsSync(sitemapPath)) {
        return ctx.notFound("Sitemap not found");
      }

      ctx.set("Content-Type", "application/xml");
      ctx.body = fs.createReadStream(sitemapPath);
    } catch (error) {
      ctx.throw(500, "Internal Server Error");
    }
  },
};
