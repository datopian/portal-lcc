import MiniSearch from "minisearch";

import OrgCard from "./OrgCard";
import { Organization } from "@portaljs/ckan";

export default function ListOfOrgs({
  orgs,
  searchString,
  miniSearch,
}: {
  orgs: Array<Organization>;
  searchString: string;
  miniSearch: MiniSearch<any>;
}) {

  return (
    <section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {orgs.map((org) => (
        <div
          className={`col-span-1 ${
            searchString !== "" &&
            !miniSearch
              .search(searchString, { prefix: true })
              .find((result) => result.id === org.id)
              ? "hidden"
              : "block"
          }`}
          key={org.id}
        >
          <OrgCard
            description={org.description}
            display_name={org.display_name}
            image_display_url={org.image_display_url}
            name={org.name}
          />
        </div>
      ))}
    </section>
  );
}
