const fs = require('fs');
const path = require('path');

const prefix = '[postbuild]';

const tagListPath = path.join(__dirname, 'src', 'tag-list.json');
const tagList = JSON.parse(fs.readFileSync(tagListPath, 'utf-8'));
if (!tagList || !tagList.length || !(tagList.length > 0)) {
  console.error(`${prefix} No tag list found.`);
  process.exit(1);
}

const indexPath = path.join(__dirname, 'dist', 'julian-scholz', 'browser', 'index.html');
fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    console.error(`${prefix}`, err);
    process.exit(1);
  }

  const indexResult = data
    .replace('</style>', '.svg-inline--fa{display:none}</style>')
    .replace(
      'content="DUMMY_KEYWORDS_VALUE"',
      `content="${tagList.flatMap(item => item.tags).join(', ')}"`
    ).replace(/"knowsAbout":\s*([^,]*)/, `"knowsAbout": ${JSON.stringify(tagList.flatMap(item => item.tags))}`);

  fs.writeFile(indexPath, indexResult, 'utf8', (err) => {
    if (err) {
      console.error(`${prefix}`, err);
      process.exit(1);
    } else {
      console.log(`${prefix} Edited index.html.`);
    }
  });
});

const sitemapPath = path.join(__dirname, 'dist', 'julian-scholz', 'browser', 'sitemap.xml');
fs.readFile(sitemapPath, 'utf8', (err, data) => {
  if (err) {
    console.error(`${prefix}`, err);
    process.exit(1);
  }

  const dateToday = new Date();
  const correctDateToday = new Date(dateToday.getTime() - (dateToday.getTimezoneOffset() * 60 * 1000));
  const sitemapResult = data.replace(
    '<lastmod></lastmod>',
    `<lastmod>${correctDateToday.toISOString().split('T')[0]}</lastmod>`
  );

  fs.writeFile(sitemapPath, sitemapResult, 'utf8', (err) => {
    if (err) {
      console.error(`${prefix}`, err);
      process.exit(1);
    } else {
      console.log(`${prefix} Edited sitemap.xml.`);
    }
  });
});
