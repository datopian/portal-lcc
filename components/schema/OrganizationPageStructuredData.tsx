import nextSeoConfig, { imageUrl, siteTitle, url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, WebPageJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo";

export function OrganizationPageStructuredData() {
  const title = "Organisations"
  const description = "Organisations page of " + siteTitle
  return (
    <>
      <LogoJsonLd
        url={`${url}/organisations`}
        logo={`${url}/favicon.ico`}
      />
      <NextSeo
        canonical={`${url}/organisations`}
        title={`${title} | ${siteTitle}`}
        description={description}
        openGraph={{
          url: `${url}/organisations`,
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
            name: 'Organisations Page',
            item: `${url}/organisations`,
          },
        ]}
      />
      <WebPageJsonLd
        id={`${url}/organisations#webpage`}
        url={`${url}/organisations`}
        name={title}
        description={description}
      />
      <SiteLinksSearchBoxJsonLd
        url={`${url}/organisations`}
        potentialActions={[
          {
            target: `${url}/organisations`,
            queryInput: "search_term_string"
          },
        ]}
      />
    </>
  );
}