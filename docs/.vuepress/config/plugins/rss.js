// RSS 订阅插件（手写，零依赖）
module.exports = (options, ctx) => ({
  name: 'rss-generator',
  generated() {
    const fs = require('fs');
    const path = require('path');
    const siteUrl = options.site_url || 'https://blog.f1sh.org';
    const copyright = options.copyright || '';
    const count = options.count || 20;

    const pages = ctx.pages
      .filter(p => p.frontmatter?.title && p.frontmatter?.date && p.frontmatter?.permalink)
      .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
      .slice(0, count);

    const items = pages.map(p => `
    <item>
      <title><![CDATA[${p.frontmatter.title}]]></title>
      <link>${siteUrl}${p.path}</link>
      <guid>${siteUrl}${p.path}</guid>
      <pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.excerpt || p.frontmatter.title}]]></description>
    </item>`).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title><![CDATA[${ctx.siteConfig.title}]]></title>
    <description><![CDATA[${ctx.siteConfig.description}]]></description>
    <link>${siteUrl}</link>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>zh-CN</language>
    <copyright><![CDATA[${copyright}]]></copyright>
    ${items}
  </channel>
</rss>`;

    const dist = path.resolve(ctx.sourceDir, '.vuepress/dist');
    if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });
    fs.writeFileSync(path.join(dist, 'rss.xml'), xml);
    console.log('\n RSS  Generated rss.xml with', pages.length, 'articles\n');
  }
});
