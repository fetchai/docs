import React, { ChangeEvent, useState } from "react";
import { GuideBox } from "./feature-guide-tabs";
import { Grid3 } from "./mdx";
import styles from "./footer.module.css";
import { SearchIcon } from "src/icons/shared-icons";

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
}

interface GuidesData {
  content: GuideCategory[];
}

const GuideMdx = ({ content }: GuidesData) => {
  const [value, setValue] = useState<string>("");
  const [inputVal, setInputVal] = useState<string>("");
  const [evt, setEvt] = useState<string>("");

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

  const filteredContent = content
    .map((con) => ({
      ...con,
      data: con.data.filter((item) => {
        if (value !== "" && evt === "select") {
          return con.type === value;
        }
        if (inputVal !== "" && evt === "input") {
          return (
            item.title.toLowerCase().includes(inputVal.toLowerCase()) ||
            item.description.toLowerCase().includes(inputVal.toLowerCase())
          );
        }
        return true;
      }),
    }))
    .filter((con) => con.data.length > 0);

  return (
    <div className="nx-flex nx-flex-col nx-w-full nx-mt-6">
      <div className="md:nx-flex nx-block nx-gap-5">
        <select
          name="select"
          onChange={onSelectChange}
          className="nx-rounded-[10px] nx-outline-none nx-cursor-pointer nx-border nx-border-solid nx-bg-transparent nx-py-2 nx-px-4 dark:full-border-dark dark:nx-text-white-90"
        >
          <option value="">All Types</option>
          {content
            .map((item) => item.type)
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
            className={styles.inputInner}
            placeholder="Search...."
          />
          <SearchIcon />
        </div>
      </div>
      {filteredContent.map((con, index) => (
        <div key={index}>
          <h2
            className={`nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100 nx-mt-10 nx-pb-1 ${
              con.subSection ? `nx-text-2xl` : `nx-text-3xl nx-border-b`
            } nx-border-neutral-200/70 contrast-more:nx-border-neutral-400 dark:nx-border-primary-100/10 contrast-more:dark:nx-border-neutral-400`}
          >
            {con.type}
            <span
              className="nx-absolute -nx-mt-20"
              id={con.type.toLowerCase()}
            ></span>
            <a
              href={`#${con.type.toLowerCase()}`}
              className="subheading-anchor"
              aria-label="Permalink for this section"
            ></a>
          </h2>
          <div className="nx-text-fetch-content">{con.description}</div>
          <Grid3>
            {con.data
              .filter((item) => {
                if (inputVal !== "") {
                  return (
                    item.title.toLowerCase().includes(inputVal.toLowerCase()) ||
                    item.description
                      .toLowerCase()
                      .includes(inputVal.toLowerCase())
                  );
                }
                return true;
              })
              .map((guide, index) => (
                <GuideBox
                  key={index}
                  content={{
                    title: guide.title,
                    description: guide.description,
                    path: guide.path,
                  }}
                />
              ))}
          </Grid3>
        </div>
      ))}
    </div>
  );
};

export default GuideMdx;
