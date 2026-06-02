new Crawler({
  appId: "82WP2HPIFQ",
  indexPrefix: "",
  rateLimit: 8,
  maxUrls: null,
  schedule: "on the 1 and 15 day of the month",
  startUrls: ["https://blog.f1sh.org"],
  sitemaps: ["https://blog.f1sh.org/sitemap.xml"],
  ignoreQueryParams: ["source", "utm_*"],
  actions: [
    {
      indexName: "fishbyte_articles",
      pathsToMatch: ["https://blog.f1sh.org/**"],
      recordExtractor: ({ url, $ }) => {
        // 跳过无实际内容的页面
        const skipPaths = ["/", "/404", "/one/", "/two/", "/more/", "/stars/", "/archives/"];
        if (skipPaths.includes(url.pathname)) return [];

        const title =
          $("h1").text().trim() || $("title").text().split("|")[0].trim();
        if (!title) return [];

        const category = $(".sidebar-heading.active").first().text().trim();
        const content = $(
          ".theme-vdoing-content, .content__default, .article-content"
        );
        if (!content.length) return [];

        const fullText = content.text().trim();
        if (!fullText) return [];

        /** @type {any[]} */
        const records = [];

        // 按 h2/h3/h4 拆分段落记录（直接取页面渲染好的 id 做锚点，点击即可跳转）
        const headings = content.find("h2, h3, h4");
        headings.each((i, el) => {
          const tag = el.tagName.toLowerCase();
          const headingText = $(el).text().trim();
          if (!headingText) return;

          const anchor = $(el).attr("id");
          if (!anchor) return;

          const sectionText = $(el)
            .nextUntil("h2, h3, h4")
            .text()
            .trim()
            .substring(0, 2000);
          if (!sectionText) return;

          records.push({
            objectID: url.href + "#" + anchor,
            url: url.href + "#" + anchor,
            type: "content",
            hierarchy: {
              lvl0: category || title,
              lvl1: title,
              lvl2: tag === "h2" ? headingText : null,
              lvl3: tag === "h3" ? headingText : null,
              lvl4: null,
              lvl5: null,
              lvl6: null,
            },
            content: sectionText,
          });
        });

        return records;
      },
    },
  ],
  initialIndexSettings: {
    fishbyte_articles: {
      searchableAttributes: [
        "unordered(hierarchy.lvl0)",
        "unordered(hierarchy.lvl1)",
        "unordered(hierarchy.lvl2)",
        "unordered(hierarchy.lvl3)",
        "unordered(content)",
      ],
    },
  },
  apiKey: "343ee456d272648faa7909636772563e",
});