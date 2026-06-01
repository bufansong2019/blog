// 站点地图插件（手写，零依赖）
module.exports = (options, ctx) => ({
  name: 'sitemap-generator',
  generated() {
    const fs = require('fs');
    const path = require('path');
    const hostname = options.hostname || 'https://blog.f1sh.org';
    const urls = ctx.pages
      .filter(p => p.path && p.frontmatter?.sitemap !== false)
      .map(p => ({
        loc: `${hostname}${p.path}`,
        lastmod: p.lastUpdated ? new Date(p.lastUpdated).toISOString().split('T')[0] : ''
      }));
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;
    const dist = path.resolve(ctx.sourceDir, '.vuepress/dist');
    if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });
    fs.writeFileSync(path.join(dist, 'sitemap.xml'), xml);
    console.log(`\n SITEMAP  Generated sitemap.xml with ${urls.length} URLs\n`);
  }
});
