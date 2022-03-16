const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");

export default async (req, res) => {
  const links = [
    { url: "/seo-services", changefreq: "daily", priority: 0.3 },
    { url: "/web-services", changefreq: "daily", priority: 0.3 },
    { url: "/design", changefreq: "daily", priority: 0.3 },
    { url: "/plan2", changefreq: "daily", priority: 0.3 },
    { url: "/design", changefreq: "daily", priority: 0.3 },
    { url: "/portfolio", changefreq: "daily", priority: 0.3 },
    { url: "/allpseo", changefreq: "daily", priority: 0.3 },
    { url: "/allpgraphic", changefreq: "daily", priority: 0.3 },
    { url: "/blogs", changefreq: "daily", priority: 0.3 },
    { url: "/estekhdam", changefreq: "daily", priority: 0.3 },
    { url: "/about", changefreq: "daily", priority: 0.3 },
    { url: "/contact", changefreq: "daily", priority: 0.3 },
  ];

  const stream = new SitemapStream({ hostname: "https://touskaweb.com" });

  res.writeHead(200, {
    "Content-Type": "application/xml",
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);
};
