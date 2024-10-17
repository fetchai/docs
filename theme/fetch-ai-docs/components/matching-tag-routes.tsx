/* eslint-disable unicorn/consistent-function-scoping */
import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetchJson from "src/lib/fetch-json";
import { GridView } from "components/grid-view";
import { Input } from "./input";
import {
  GridViewIcon,
  LeftIcon,
  ListViewIcon,
  SearchIcon,
} from "src/icons/shared-icons";

interface RouteInfo {
  route: string;
  tags: string[];
}

interface RoutesComponentProps {
  routes: RouteInfo[];
  setMatchingTagRoute: React.Dispatch<React.SetStateAction<RouteInfo[]>>;
}

export function MatchingRoutesComponent({
  routes,
  setMatchingTagRoute,
}: RoutesComponentProps): ReactElement {
  const [viewType, setViewType] = useState<"list" | "grid">("list");
  const [content, setContent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [matchedRoutes, setMatchedRoutes] = useState<RouteInfo[]>(routes);
  const router = useRouter();
  const toggleView = (type) => {
    setViewType(type);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    const filteredRoutes = routes.filter((routeInfo) => {
      const guideInfo = findGuideByPath(content, routeInfo.route);
      return guideInfo.title.toLowerCase().includes(searchQuery);
    });
    setMatchedRoutes(filteredRoutes);
  };

  const fetchGuide = async () => {
    const content = await fetchJson("/docs/api/guides");
    return content;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await fetchGuide()) as { guide: string };
        const regex = /{{([\S\s]*?)}}/gm;
        const matches = response.guide.match(regex);
        const jsonData = matches.map((item) =>
          JSON.parse(
            item
              .replaceAll("\n", "")
              .replaceAll("  ", "")
              .replaceAll("{{", "{")
              .replaceAll("}}", "}")
              .replaceAll("title", '"title"')
              .replaceAll("description", '"description"')
              .replaceAll("path", '"path"')
              .replaceAll(",}", "}"),
          ),
        );
        setContent(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const findGuideByPath = (content, searchPath) => {
    for (const element of content) {
      if (element.path.includes(searchPath)) {
        return {
          title: element.title,
          description: element.description,
        };
      }
    }

    const { title, description } = createTitle(searchPath);
    return {
      title: title,
      description: description,
    };
  };

  const createTitle = (route) => {
    const pathArray = route.split("/");
    const title = pathArray.at(-1).replaceAll("-", " ");
    let description = pathArray.join(">");
    if (description.charAt(0) === ">") {
      description = description.slice(1);
    }
    return { title, description };
  };

  const routeTitle = () => {
    const pathname = window.location.pathname;
    return (
      pathname.split("/").pop().split("-").join(" ").charAt(0).toUpperCase() +
      pathname.split("/").pop().split("-").join(" ").slice(1)
    );
  };

  return (
    <div>
      <button
        style={{ padding: "4px 12px 4px 12px" }}
        onClick={() => setMatchingTagRoute(null)}
        className="tags first-letter:flex min-h-[32px] nx-rounded justify-center items-center gap-[6px]"
      >
        <div className="nx-flex nx-justify-between nx-items-center nx-gap-2">
          <LeftIcon />
          <span className="nx-text-[#000D3D] nx-text-sm nx-font-normal">
            Back to {routeTitle()}
          </span>
        </div>
      </button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3 className="nx-text-xl nx-mt-8 nx-font-normal nx-text-[#0B1742] dark:nx-text-white-90">
            {matchedRoutes?.length} topics matching with the tag
          </h3>
        </div>

        <div
          className={`nx-flex nx-w-[60px] nx-h-[32px] nx-p-[2px] nx-items-start nx-gap-[0px] toggle-view nx-bg-transparent`}
        >
          <button
            onClick={() => toggleView("list")}
            className={
              viewType === "list" ? "toggle-list-grid-bg" : "nx-bg-transparent"
            }
          >
            <ListViewIcon viewType={viewType} />
          </button>
          <button
            onClick={() => toggleView("grid")}
            className={
              viewType === "grid" ? "toggle-list-grid-bg" : "nx-bg-transparent"
            }
          >
            <GridViewIcon viewType={viewType} />
          </button>
        </div>
      </div>
      <div className="tags-input">
        <Input
          type="search"
          className="nx-bg-white input-inner-nav"
          placeholder="Search in results"
          onChange={handleSearch}
        />
        <div className="nx-p-1">
          <SearchIcon />
        </div>
      </div>

      {viewType === "list" ? (
        <ul className="nx-mt-8">
          {matchedRoutes.map((routeInfo, index) => {
            const guideInfo = findGuideByPath(content, routeInfo.route);
            return (
              <li
                className="list-view list-view-title nx-mt-4 dark:nx-bg-dark-mode-white-5 dark:nx-border-none"
                key={index}
                onClick={() => {
                  router.push(routeInfo.route);
                }}
              >
                <p>{guideInfo.title}</p>
                <p className="tag-description">{guideInfo.description}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="nx-mt-4">
          <div className="nx-grid nx-grid-cols-1 sm:nx-grid-cols-2 md:nx-grid-cols-3 lg:nx-grid-cols-4 nx-gap-4">
            {matchedRoutes.map((routeInfo, index) => {
              const guideInfo = findGuideByPath(content, routeInfo.route);
              return (
                <GridView
                  key={index}
                  content={{
                    title: guideInfo.title,
                    description: guideInfo.description,
                    path: routeInfo.route,
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
