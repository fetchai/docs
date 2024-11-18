import React, { ReactNode, useState, ChangeEvent } from "react";
import { SearchIcon, DropDownArrow } from "src/icons/shared-icons";
import styles from "./components.module.css";
import { motion } from "framer-motion";
import Link from "next/link";

interface Guide {
  title: string;
  description: string;
  path: string;
}

interface GuideCategory {
  type: string;
  description?: string;
  subSection?: boolean;
  data: Guide[];
  icon?: () => React.JSX.Element;
}

interface GuidesData {
  content: GuideCategory[];
}

const pathLabels = new Map<RegExp, string>([
  [/\/.*?(quickstart|getting-started|easy).*?\//i, "Beginner"],
  [/\/.*?intermediate.*?\//i, "Intermediate"],
  [/\/.*?advanced.*?\//i, "Advanced"],
]);

const getPathLabel = (path: string): string => {
  for (const [regex, label] of pathLabels) {
    if (regex.test(path)) {
      return label;
    }
  }
  return "";
};

const SectionHeading = ({
  heading,
  icon,
}: {
  heading: string;
  icon?: () => React.JSX.Element;
}) => (
  <div className="nx-flex nx-flex-col nx-gap-6">
    {icon && icon()}
    <span className={styles.heading}>{heading}</span>
  </div>
);

const SectionDetails = ({
  children,
  path,
}: {
  children: ReactNode;
  path: string;
}) => {
  const label = getPathLabel(path);
  return (
    <div className={styles.sectionDetails}>
      {children}
      {label && <div className={`${styles.label}`}>{label}</div>}
    </div>
  );
};

const GridBox = ({ children }: { children: ReactNode }) => (
  <div className="nx-grid nx-grid-cols-1 md:nx-grid-cols-2 nx-my-12 nx-items-start nx-gap-12">
    {children}
  </div>
);

const FilterDropdown = ({
  content,
  value,
  onSelectChange,
  isOpen,
  toggleDropdown,
  activeType,
}: {
  content: GuideCategory[];
  value: string;
  onSelectChange: (selectedType: string) => void;
  isOpen: boolean;
  toggleDropdown: () => void;
  activeType: string;
}) => (
  <div>
    <div onClick={toggleDropdown} className={styles.dropDownGuide}>
      <span className={styles.dropdownActive}>{value}</span>
      <DropDownArrow isActive={isOpen} />
    </div>
    {isOpen && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        transition={{ duration: 0.1 }}
        className="nx-z-50 nx-mt-2 nx-absolute dropDownGuide"
        style={{ overflow: "hidden" }}
      >
        <div className="nx-flex-col nx-p-2 nx-w-full !nx-items-start nx-justify-between nx-cursor-pointer">
          <div
            className={`nx-text-lg nx-cursor-pointer ${styles.tab}`}
            onClick={() => onSelectChange("All Types")}
          >
            All Types
          </div>
          {content
            .map((item) => item.type)
            .map((type) => (
              <div
                key={type}
                className={`nx-text-lg ${styles.tab} ${
                  activeType === type && styles.active
                } nx-cursor-pointer`}
                onClick={() => onSelectChange(type)}
              >
                {type}
              </div>
            ))}
        </div>
      </motion.div>
    )}
  </div>
);

const SearchInput = ({
  inputVal,
  onInputChange,
}: {
  inputVal: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className={styles.inputBoxGuide}>
    <SearchIcon />
    <input
      value={inputVal}
      onChange={onInputChange}
      className={styles.inputGuide}
      name="input"
      placeholder="Search...."
    />
  </div>
);

const GuidesMdx = ({ content }: GuidesData) => {
  const [filterState, setFilterState] = useState({
    value: "All Types",
    inputVal: "",
    evt: "",
    activeType: "All Types",
    openDropdown: false,
  });

  const toggleDropdown = () =>
    setFilterState((prev) => ({ ...prev, openDropdown: !prev.openDropdown }));

  const onSelectChange = (selectedType: string) => {
    setFilterState((prev) => ({
      ...prev,
      value: selectedType,
      activeType: selectedType,
      openDropdown: false,
      evt: "select",
    }));
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilterState((prev) => ({
      ...prev,
      inputVal: value,
      evt: value === "" ? "select" : "input",
    }));
  };

  const filteredContent = content
    .map((con) => ({
      ...con,
      data: con.data.filter((item) => {
        if (filterState.evt === "select" && filterState.value !== "All Types") {
          return con.type === filterState.value;
        }
        if (filterState.evt === "input" && filterState.inputVal !== "") {
          return (
            item.title
              .toLowerCase()
              .includes(filterState.inputVal.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(filterState.inputVal.toLowerCase())
          );
        }
        return true;
      }),
    }))
    .filter((con) => con.data.length > 0);

  return (
    <>
      <div className="md:nx-flex-row nx-flex-col nx-flex nx-mt-6 nx-gap-3">
        <FilterDropdown
          content={content}
          value={filterState.value}
          onSelectChange={onSelectChange}
          isOpen={filterState.openDropdown}
          toggleDropdown={toggleDropdown}
          activeType={filterState.activeType}
        />
        <SearchInput
          inputVal={filterState.inputVal}
          onInputChange={onInputChange}
        />
      </div>
      <div>
        <GridBox>
          {filteredContent.map((items, index) => (
            <div
              key={index}
              className="nx-flex nx-flex-col nx-items-start nx-gap-4"
            >
              <SectionHeading icon={items.icon} heading={items.type} />
              <div className="nx-flex nx-flex-col nx-w-full nx-items-start nx-gap-4">
                {items.data.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    className="nx-text-blue-500 nx-w-full"
                    href={item.path}
                  >
                    <SectionDetails path={item.path}>
                      {item.title}
                    </SectionDetails>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </GridBox>
      </div>
    </>
  );
};

export default GuidesMdx;
