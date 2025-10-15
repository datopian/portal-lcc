import { Group } from "@portaljs/ckan";
import GroupCard from "../../groups/GroupCard";
import PopularDatasets from "./PopularDatasets";
import ActionCard from "../actions/actionCard";
import Link from "next/link";
import {
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import {
  RiBarChart2Line,
  RiQuestionnaireLine,
  RiSearch2Line,
} from "react-icons/ri";
import { Dataset } from "@/schemas/dataset.interface";


export default function MainSection({
  groups,
  datasets,
}: {
  groups: Array<Group>;
  datasets: Array<Dataset>;
}) {
  return (
    <section className="custom-container homepage-padding pb-0">
      <div className="flex flex-col md:flex-row md:items-start gap-8 mb-[100px]">
        {[
          {
            title: "Find Data",
            description: "Find, share, use and gain insights from data.",
            href: "/search",
            icon: <RiSearch2Line width={48} />,
          },
          {
            title: "Explore Visualisations",
            description: "Dive into curated visual stories powered by real data.",
            href: "/search?type=visualization",
            icon: <RiBarChart2Line width={48} />,
          },
          {
            title: "Explore Data with AI",
            description: "Use Claude or ChatGPT to explore the data portal via our MCP server.",
            href: "/ai",
            icon: <RiQuestionnaireLine width={48} />,
          },
        ].map((item, i) => (
          <ActionCard {...item} key={i} />
        ))}
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-y-10">
        {datasets.length > 0 && (
          <section className="col-span-1 md:pr-2 mb-8 lg:mb-0">
            <PopularDatasets datasets={datasets} />
          </section>
        )}
        <section className="relative">
          {groups.length > 4 && (
            <Link
              href="/topics"
              className={`font-montserrat border-b-2 border-accent font-semibold flex items-center gap-1 uppercase hover:text-accent ml-auto w-fit absolute right-0 top-[-30px]`}
            >
              View all topics
              <ArrowLongRightIcon width={16} />
            </Link>
          )}
          <div className="mt-2 col-span-1 grid sm:grid-cols-2 gap-4 md:pl-2">
            {groups.slice(0, 4).map((group) => (
              <article key={group.id} className="col-span-1 h-fit">
                <GroupCard
                  description={group.description}
                  display_name={group.display_name}
                  image_display_url={group.image_display_url}
                  name={group.name}
                />
              </article>
            ))}
          </div>
        </section>
      </section>
    </section>
  );
}
