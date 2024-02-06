/* eslint-disable unicorn/consistent-function-scoping */
import { GuideBox } from "components/feature-guide-tabs";
import { Button } from "nextra/components";
import React, { ReactElement, useEffect, useState } from "react";
import { FaBars, FaThLarge, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useRouter } from "next/router";
import fetchJson from "src/lib/fetch-json";

interface RouteInfo {
  route: string;
  tags: string[];
}

interface RoutesComponentProps {
  routes: RouteInfo[];
}

export function MatchingRoutesComponent({
  routes,
}: RoutesComponentProps): ReactElement {
  const [viewType, setViewType] = useState<"list" | "grid">("list");
  const [content, setContent] = useState([]);
  const [isListViewCollapsed, setListViewCollapsed] = useState(false);
  const router = useRouter();
  const toggleView = (type) => {
    setViewType(type);
  };

  const toggleListView = () => {
    setListViewCollapsed((prevCollapsed) => !prevCollapsed);
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
    return {
      title: "Default Title",
      description: "Default Description",
    };
  };

  return (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <h3 style={{ marginRight: "10px" }}>Topics with matching tag:</h3>
        <Button
          title="Switch to List View"
          style={{
            marginRight: "10px",
            padding: "8px",
            borderRadius: "4px",
            background: `${
              viewType === "list" ? "rgba(144, 238, 144, 0.5)" : ""
            }`,
          }}
          onClick={() => toggleView("list")}
        >
          <FaBars
            style={{
              fontSize: "20px",
            }}
          />
        </Button>
        <Button
          title="Switch to Grid View"
          style={{
            padding: "8px",
            borderRadius: "4px",
            background: `${
              viewType === "grid" ? "rgba(144, 238, 144, 0.5)" : ""
            }`,
          }}
          onClick={() => toggleView("grid")}
        >
          <FaThLarge style={{ fontSize: "20px" }} />
        </Button>

        {isListViewCollapsed ? (
          <FaAngleDown
            title="expand"
            onClick={toggleListView}
            style={{ marginLeft: "20px" }}
            className="nx-cursor-pointer"
          />
        ) : (
          <FaAngleUp
            title="collapse"
            onClick={toggleListView}
            style={{ marginLeft: "20px" }}
            className="nx-cursor-pointer"
          />
        )}
      </div>

      {viewType === "list"
        ? !isListViewCollapsed && (
            <ul>
              {routes.map((routeInfo, index) => (
                <li
                  className="list-view nx-mt-4"
                  key={index}
                  onClick={() => {
                    router.push(routeInfo.route);
                  }}
                >
                  <p
                    style={{
                      color: "rgba(11, 23, 66, 0.8)",
                      fontSize: "24px",
                      fontWeight: "400",
                    }}
                  >
                    {findGuideByPath(content, routeInfo.route).title}
                  </p>
                  <p
                    style={{
                      color: "rgba(11, 23, 66, 0.8)",
                      fontSize: "18px",
                      fontWeight: "300",
                    }}
                  >
                    {" "}
                    {findGuideByPath(content, routeInfo.route).description}
                  </p>
                </li>
              ))}
            </ul>
          )
        : !isListViewCollapsed && (
            <div className="nx-mt-4">
              <div className="nx-grid nx-grid-cols-1 sm:nx-grid-cols-2 md:nx-grid-cols-3 lg:nx-grid-cols-4 nx-gap-4">
                {routes.map((routeInfo, index) => (
                  <GuideBox
                    key={index}
                    content={{
                      title: findGuideByPath(content, routeInfo.route).title,
                      description: findGuideByPath(content, routeInfo.route)
                        .description,
                      path: routeInfo.route,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
    </div>
  );
}
