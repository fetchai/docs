import React, { useState } from "react";
import { GuideBox } from "./feature-guide-tabs";
import { Grid3 } from "./mdx";
import Filters from "./filters";

interface Content {
  type: string;
  title: string;
  description: string;
  path: string;
}

const GuidesLandingComponent = ({ content }: { content: Content[] }) => {
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFilters, setOpenFilters] = useState(false);

  const uniqueTypes = ["all"];
  for (const item of content) {
    if (!uniqueTypes.includes(item.type)) {
      uniqueTypes.push(item.type);
    }
  }
  const filteredContent = content.filter((item) => {
    if (filterType === "all" || item.type === filterType) {
      return (
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return false;
  });

  const handleFilterChange = (value) => {
    setFilterType(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div className="nx-grid nx-grid-cols-1 nx-pt-4 sm:nx-grid-cols-1 md:nx-grid-cols-2 lg:nx-grid-cols-2 nx-gap-4 nx-my-4">
        <Filters
          dropDownData={uniqueTypes}
          name={"Filter"}
          open={openFilters}
          setOpen={setOpenFilters}
          selectedValue={filterType}
          handleItemClick={handleFilterChange}
        />

        <input
          type="text"
          id="guides-search"
          className="nx-font-normal nx-bg-transparent nx-rounded-full nx-border nx-border-solid nx-px-6 nx-py-3"
          placeholder="Search in guides"
          required
          onChange={handleSearchChange}
          value={searchQuery}
        />
      </div>

      <Grid3>
        {filteredContent.map((item, index) => (
          <GuideBox
            content={{
              title: item.title,
              description: item.description,
              path: item.path,
            }}
            key={index}
          />
        ))}
      </Grid3>
    </div>
  );
};

export default GuidesLandingComponent;
