import nextSeoConfig, { imageUrl, siteTitle, url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, WebPageJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo";

export function GroupPageStructuredData() {
  const title = "Topics"
  const description = "Topics page of " + siteTitle
  return (
    <>
      <LogoJsonLd
        url={`${url}/topics`}
        logo={`${url}/favicon.ico`}
      />
      <NextSeo
        canonical={`${url}/topics`}
        title={`${title} | ${siteTitle}`}
        description={description}
        openGraph={{
          url: `${url}/topics`,
          title: `${title} | ${siteTitle}`,
          description: description,
          images: [
            {
              url: imageUrl,
              alt: title,
              width: 1200,
              height: 627,
            },
          ],
          site_name: siteTitle,
        }}
        twitter={nextSeoConfig.twitter}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: 'Home',
            item: url,
          },
          {
            position: 2,
            name: 'Topics Page',
            item: `${url}/topics`,
          },
        ]}
      />
      <WebPageJsonLd
        id={`${url}/topcis#webpage`}
        url={`${url}/topcis`}
        name={title}
        description={description}
      />
      <SiteLinksSearchBoxJsonLd
        url={`${url}/topcis`}
        potentialActions={[
          {
            target: `${url}/topcis`,
            queryInput: "search_term_string"
          },
        ]}
      />
    </>
  );
}