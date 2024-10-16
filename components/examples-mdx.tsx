import React, { useState, ChangeEvent } from "react";
import { GuideBox } from "./feature-guide-tabs";
import styles from "./footer.module.css";
import { Grid2 } from "./mdx";
import { SearchIcon } from "src/icons/shared-icons";

interface Content {
  type: string;
  title: string;
  description: string;
  path: string;
}

interface FilterMdxProps {
  content: Content[];
}

const ExamplesMdx: React.FC<FilterMdxProps> = ({ content }) => {
  const [value, setValue] = useState<string>("");
  const [evt, setEvt] = useState<string>("");
  const [inputVal, setInputVal] = useState<string>("");

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setEvt(event.target.name);
    setValue(event.target.value);
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEvt(event.target.name);
    setInputVal(event.target.value);
    if (event.target.value === "") {
      setEvt("select");
      setValue(value);
    }
  };

  return (
    <div className="nx-flex nx-flex-col nx-w-full nx-py-6">
      <div className="md:nx-flex nx-block nx-gap-5">
        <select
          name="select"
          onChange={onSelectChange}
          className="nx-rounded-[10px] nx-outline-none nx-cursor-pointer nx-border nx-border-solid nx-bg-transparent nx-py-2 nx-px-4 dark:full-border-dark dark:nx-text-white-90"
        >
          <option value="">All Types</option>
          {content
            .map((item) => item.type)
            .filter((type, index, array) => array.indexOf(type) === index)
            .map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
        </select>
        <div className={styles.inputBox}>
          <input
            name="input"
            value={inputVal}
            onChange={onInputChange}
            placeholder="Search...."
            className={styles.inputInner}
          />
          <SearchIcon />
        </div>
      </div>
      <Grid2>
        {content
          .filter((item) => {
            if (evt === "select") {
              return value === "" || item.type === value;
            } else if (evt === "input") {
              const searchInTitle = item.title
                .toLowerCase()
                .includes(inputVal.toLowerCase());
              const searchInDescription = item.description
                .toLowerCase()
                .includes(inputVal.toLowerCase());
              return searchInTitle || searchInDescription;
            } else {
              return true;
            }
          })
          .map((item, index) => (
            <GuideBox
              key={index}
              content={{
                title: item.title,
                description: item.description,
                path: item.path,
              }}
            />
          ))}
      </Grid2>
    </div>
  );
};

export default ExamplesMdx;
