import React from "react";
import type { Dispatch, SetStateAction } from "react";

export interface FiltersTypes {
  name: string;
  icon?: React.ReactNode | React.ReactNode[];
  dropDownData: Array<string>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedValue: string;
  handleItemClick: (index: string) => void;
}

const Filters = ({
  name,
  icon,
  dropDownData,
  open,
  setOpen,
  selectedValue,
  handleItemClick,
}: FiltersTypes) => {
  return (
    <div
      onClick={() => setOpen(!open)}
      className="nx-relative nx-items-center nx-gap-2 nx-w-full"
    >
      <button
        id="guides-filter"
        className={`${
          open ? "nx-dropDown" : ""
        } nx-w-full nx-cursor-pointer nx-rounded-full nx-border nx-border-solid nx-px-6 nx-py-3 nx-font-normal `}
      >
        <div className="nx-flex nx-items-center nx-gap-[19px]">
          <div className="nx-text-[18px]">
            {name}: {selectedValue}
          </div>
          <div className="nx-text-base">{icon}</div>
        </div>
      </button>
      {open && (
        <div className="nx-dropDown nx-w-full nx-absolute nx-z-10 nx-mt-2 nx-flex nx-flex-col nx-items-start nx-rounded-[12px] nx-p-1 nx-backdrop-blur-[45px]">
          {dropDownData.map((item) => (
            <div
              key={item}
              onClick={() => handleItemClick(item)}
              className={`nx-flex nx-cursor-pointer nx-items-center nx-justify-between nx-gap-[18px] nx-self-stretch nx-p-3 nx-hover:nx-shadow-grey-shadow ${
                selectedValue === item ? "nx-selected" : ""
              }`}
            >
              <label className="nx-text-base nx-font-normal">{item}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filters;
