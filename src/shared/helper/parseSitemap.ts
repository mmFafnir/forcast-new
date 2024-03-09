const { parseString } = require("xml2js");

export async function parseSitemap(
  xmlString: string
): Promise<{ url: string }[]> {
  return new Promise((resolve, reject) => {
    parseString(xmlString, (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        const urlElements = result.urlset.url;
        console.log(urlElements);
        const urls = urlElements.map((urlElement: any) => {
          const obj: { [key: string]: number | string } = {
            loc: urlElement.loc[0],
            changefreq: urlElement.changefreq
              ? urlElement.changefreq[0]
              : "monthly",
            priority: urlElement.priority ? Number(urlElement.priority[0]) : 1,
          };

          if (urlElement.lastmod) obj.lastmod = urlElement.lastmod[0];

          return obj;
        });
        resolve(urls);
      }
    });
  });
}
