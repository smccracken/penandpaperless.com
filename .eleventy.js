const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // only content in the `articles` directory
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/^\.\/_src\/posts\//) !== null;
    });
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "_src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};