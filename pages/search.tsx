import type { InferGetServerSidePropsType } from "next";
import { SWRConfig, unstable_serialize } from "swr";
import Layout from "@/components/_shared/Layout";
import DatasetSearchForm from "@/components/dataset/search/DatasetSearchForm";
import DatasetSearchFilters from "@/components/dataset/search/DatasetSearchFilters";
import ListOfDatasets from "@/components/dataset/search/ListOfDatasets";
import { searchDatasets } from "@/lib/queries/dataset";
import HeroSection from "@/components/_shared/HeroSection";
import { useTheme } from "@/components/theme/theme-provider";
import {
  SearchStateProvider,
  useSearchState,
} from "@/components/dataset/search/SearchContext";
import { PackageSearchOptions } from "@portaljs/ckan";
import { SearchPageStructuredData } from "@/components/schema/SearchPageStructuredData";

export async function getServerSideProps(context) {
  const initialRequestOption: PackageSearchOptions & { type?: string } = {
    offset: context.query.offset
      ? Number.parseInt(
          Array.isArray(context.query.offset)
            ? context.query.offset[0]
            : context.query.offset,
          10
        ) || 0
      : 0,
    limit: context.query.limit
      ? Number.parseInt(
          Array.isArray(context.query.limit)
            ? context.query.limit[0]
            : context.query.limit,
          10
        ) || 10
      : 10,
    tags: context.query.tags
      ? Array.isArray(context.query.tags)
        ? context.query.tags
        : [context.query.tags]
      : [],
    groups: context.query.groups
      ? Array.isArray(context.query.groups)
        ? context.query.groups
        : [context.query.groups]
      : [],
    orgs: context.query.orgs
      ? Array.isArray(context.query.orgs)
        ? context.query.orgs
        : [context.query.orgs]
      : [],
    resFormat: context.query.resFormat
      ? Array.isArray(context.query.resFormat)
        ? context.query.resFormat
        : [context.query.resFormat]
      : [],
    type: context.query.type || "dataset",
    query: context.query.query || "",
    sort: context.query.sort || "",
  };

  const search_result = await searchDatasets(initialRequestOption);

  return {
    props: {
      fallback: {
        [unstable_serialize(["package_search", initialRequestOption])]:
          search_result,
      },
      searchFacets: {
        ...search_result.search_facets,
      },
    },
  };
}

export default function DatasetSearch({
  fallback,
  searchFacets,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <SearchPageStructuredData />
      <SWRConfig value={{ fallback }}>
        <SearchStateProvider facets={searchFacets}>
          <SearchPageContent />
        </SearchStateProvider>
      </SWRConfig>
    </>
  );
}

function SearchPageContent() {
  const { options } = useSearchState();
  const {
    theme: { styles },
  } = useTheme();

  return (
    <Layout>
      <div className="grid grid-rows-searchpage-hero">
        <HeroSection title="Search" titleAccent={`${options.type}s`} />
        <section className={`grid row-start-3 row-span-2 col-span-full pt-4 `}>
          <div className={`custom-container bg-white ${styles.shadowMd}`}>
            <DatasetSearchForm />
          </div>
        </section>
      </div>
      <div className="custom-container bg-white">
        <article className="grid grid-cols-1 lg:grid-cols-9 gap-x-6 xl:gap-x-12 pt-[30px] pb-[30px]">
          <div className="lg:col-span-3  top-3 h-fit">
            <DatasetSearchFilters />
          </div>
          <div className="lg:col-span-6">
            <ListOfDatasets />
          </div>
        </article>
      </div>
    </Layout>
  );
}
