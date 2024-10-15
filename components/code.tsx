import React, { useState, ReactNode, useRef } from "react";
import { Pre } from "nextra/components";
import { CopyIcon, DropDownArrow } from "src/icons/shared-icons";
import { Windows, Mac, Ubuntu, OSProps } from "src/icons/os-icons";
import { useEffect } from "react";
import { motion } from "framer-motion";
interface CodeGroupProps {
  children: ReactNode;
  isOSFile?: boolean;
  isLocalHostedFile?: boolean;
  hasCopy?: boolean;
  osBlocks: ReactNode;
  codeBlocks: ReactNode;
}

interface CodeBlockProps {
  filename: string;
  dataLanguage?: string;
  local?: boolean;
  children: React.ReactNode;
  windows?: boolean;
  mac?: boolean;
  ubuntu?: boolean;
}

type CodeBoxProps = {
  filename?: string[];
  dataLanguage?: string;
  hasCopyCode?: boolean;
  children?: React.ReactNode;
  isOSFile?: boolean;
  isLocalHostedFile?: boolean;
  osBlocks: ReactNode;
  codeBlocks: ReactNode;
};

type CodeBlock = {
  filename?: string;
  component?: ReactNode;
  hasCopy?: boolean;
};

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onOptionSelect: (option: string) => void;
  placeholder?: string;
}

interface OsOption {
  name: string;
  icon: React.FC<OSProps>;
}

interface OsDropDownProps {
  selectedOption: string | null;
  onOptionSelect: (option: string) => void;
  placeholder: string;
  options: OsOption[];
}

export const OsDropDown: React.FC<OsDropDownProps> = ({
  selectedOption,
  onOptionSelect,
  placeholder,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  const selectedOptionData = options.find((opt) => opt.name === selectedOption);

  return (
    <div className="os-dropdown">
      <div
        className="nx-gap-1 nx-items-center nx-cursor-pointer nx-relative nx-flex"
        onClick={toggleDropdown}
      >
        {selectedOptionData ? (
          <>{selectedOptionData.icon && <selectedOptionData.icon />}</>
        ) : (
          placeholder
        )}
        <DropDownArrow />
      </div>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="nx-z-50 nx-mt-2 nx-absolute dropDown-os"
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={`osmenu-tab-container nx-justify-center nx-cursor-pointer nx-items-center ${
                selectedOption === option.name ? "blue-background" : ""
              }`}
              onClick={() => handleOptionSelect(option.name)}
            >
              {option.icon && (
                <option.icon selectedOS={selectedOption} name={option.name} />
              )}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onOptionSelect,
  placeholder = "Select",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="dropdown-outer">
      <div
        onClick={toggleDropdown}
        className="nx-relative nx-flex nx-items-center nx-gap-1 nx-cursor-pointer"
      >
        <span className="dropdown-text">{selectedOption || placeholder}</span>
        <DropDownArrow />
      </div>
      {isDropdownOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="nx-z-50 nx-mt-2 nx-absolute dropDown"
          style={{ overflow: "hidden" }}
        >
          {options.map((option) => (
            <div
              key={option}
              className={`dropdown-tab nx-justify-between tab-text nx-cursor-pointer ${
                option === selectedOption && "indgo-100"
              }`}
              onClick={() => {
                onOptionSelect(option);
                setIsDropdownOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export const CodeBlock: React.FC<{
  codeBlocks?: CodeBlock[];
  hasCopy?: boolean;
}> = ({ codeBlocks, hasCopy }) => {
  const [selectedLabel, setSelectedLabel] = useState<string>(
    codeBlocks && codeBlocks.length > 0 ? codeBlocks[0].filename : "",
  );

  if (!codeBlocks || codeBlocks.length === 0) {
    return <div>No code blocks available</div>;
  }

  const selectedCodeBlock = codeBlocks.find(
    (block) => block.filename === selectedLabel,
  );

  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    const codeContent = codeRef.current?.textContent;
    if (codeContent) {
      navigator.clipboard.writeText(codeContent).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 5000);
      });
    }
  };

  return (
    <div className="pre-out-code">
      <header className="nx-w-full nx-flex nx-justify-between">
        <Dropdown
          options={codeBlocks.map((block) => block.filename)}
          selectedOption={selectedLabel}
          onOptionSelect={setSelectedLabel}
          placeholder="Select Language"
        />
        {hasCopy && (
          <div
            onClick={handleCopy}
            className="nx-cursor-pointer nx-flex nx-gap-2 nx-items-center"
          >
            {isCopied ? (
              <>
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3359 0.414062C11.5469 0.648438 11.5469 1 11.3359 1.21094L5.14844 7.39844C4.91406 7.63281 4.5625 7.63281 4.35156 7.39844L1.16406 4.21094C0.929688 4 0.929688 3.64844 1.16406 3.4375C1.375 3.20312 1.72656 3.20312 1.9375 3.4375L4.72656 6.22656L10.5391 0.414062C10.75 0.203125 11.1016 0.203125 11.3125 0.414062H11.3359Z"
                    fill="#0B1742"
                  />
                </svg>
                <span className="nx-copy-text">Copied</span>
              </>
            ) : (
              <CopyIcon />
            )}
          </div>
        )}
      </header>
      <span className="filename">{selectedLabel}</span>
      <div
        id="inner"
        ref={codeRef}
        style={{ overflowX: "scroll", width: "100%" }}
      >
        {selectedCodeBlock?.component ?? "No code block selected"}
      </div>
    </div>
  );
};

const osmenu = [
  { name: "windows", icon: Windows },
  { name: "mac", icon: Mac },
  { name: "ubuntu", icon: Ubuntu },
];

const agentType = [
  { name: "Self hosted", label: "local" },
  { name: "Agentverse", label: "hosted" },
];

export const CustomPre: React.FC<CodeBoxProps> = ({
  hasCopyCode,
  isLocalHostedFile,
  isOSFile,
  codeBlocks,
  osBlocks,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const renderCodeChild = () => {
    return React.Children.map(codeBlocks, (child) => {
      if (React.isValidElement<CodeBlockProps>(child)) {
        return child;
      }
      return null;
    });
  };

  const child = renderCodeChild();
  const localHostdType =
    child?.length === 1 && !child[0]?.props?.local
      ? agentType[1].name
      : agentType[0].name;
  const [selectedType, setSelectedType] = useState(localHostdType);
  const [selectedOS, setSelectedOS] = useState("windows");

  const filteredAgentType =
    child?.length === 2
      ? agentType
      : agentType.filter((agent) =>
          child?.length === 1 && child[0]?.props?.local
            ? agent.label === "local"
            : agent.label === "hosted",
        );

  const renderCodeBlock = () => {
    return React.Children.map(codeBlocks, (child) => {
      if (React.isValidElement<CodeBlockProps>(child)) {
        if (selectedType === "Self hosted" && child?.props?.local) {
          return codeBlocks && child?.props?.children;
        } else if (selectedType === "Agentverse" && !child?.props?.local) {
          return codeBlocks && child?.props?.children;
        }
      }
      return null;
    });
  };

  const renderOsBlock = () => {
    return React.Children.map(osBlocks, (child) => {
      if (React.isValidElement<CodeBlockProps>(child)) {
        if (selectedOS === "windows" && child?.props?.windows) {
          return codeBlocks && child?.props?.children;
        } else if (selectedOS === "mac" && child?.props?.mac) {
          return codeBlocks && child?.props?.children;
        } else if (selectedOS === "ubuntu" && child?.props?.ubuntu) {
          return codeBlocks && child?.props?.children;
        }
      }
      return null;
    });
  };

  useEffect(() => {
    if (codeRef.current) {
      const preTags = codeRef.current.querySelectorAll("pre");

      for (const preTag of preTags) {
        if (isLocalHostedFile) {
          preTag.style.paddingTop = "80px";
        } else if (isOSFile) {
          preTag.style.paddingTop = "45px";
        } else {
          preTag.style.paddingTop = "0px";
        }
      }
    }
  }, [isLocalHostedFile, selectedType, codeBlocks, isOSFile, selectedOS]);

  const handleCopy = () => {
    const codeElements = codeRef.current?.querySelectorAll("code");
    const codeText = [...(codeElements ?? [])]
      .map((el) => el.textContent)
      .join("\n");

    if (codeText) {
      navigator.clipboard.writeText(codeText).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 5000);
      });
    }
  };

  return (
    <div className="nx-flex nx-flex-col">
      <div
        className={isOSFile || isLocalHostedFile ? "nx-relative" : "custom-pre"}
      >
        <div
          className={`nx-w-full ${
            isLocalHostedFile
              ? "nx-absolute nx-top-6 nx- nx-px-6 nx-z-[10]"
              : "nx-absolute nx-top-3 nx-px-12 nx-right-6 nx-z-[10]"
          } nx-flex nx-justify-between`}
        >
          <div className="nx-flex nx-gap-3">
            {isLocalHostedFile && (
              <Dropdown
                selectedOption={selectedType}
                onOptionSelect={setSelectedType}
                placeholder="Select Language"
                options={filteredAgentType.map((item) => item.name)}
              />
            )}
            {isOSFile && (
              <OsDropDown
                selectedOption={selectedOS}
                onOptionSelect={setSelectedOS}
                placeholder="Select Language"
                options={osmenu as []}
              />
            )}
          </div>
          <div className="nx-flex nx-p-2 nx-w-full">
            {hasCopyCode && (
              <div
                onClick={handleCopy}
                className="nx-cursor-pointer nx-ml-auto nx-flex nx-gap-2 nx-items-center"
              >
                {isCopied ? (
                  <>
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.3359 0.414062C11.5469 0.648438 11.5469 1 11.3359 1.21094L5.14844 7.39844C4.91406 7.63281 4.5625 7.63281 4.35156 7.39844L1.16406 4.21094C0.929688 4 0.929688 3.64844 1.16406 3.4375C1.375 3.20312 1.72656 3.20312 1.9375 3.4375L4.72656 6.22656L10.5391 0.414062C10.75 0.203125 11.1016 0.203125 11.3125 0.414062H11.3359Z"
                        fill="#0B1742"
                      />
                    </svg>
                    <span className="nx-copy-text">Copied</span>
                  </>
                ) : (
                  <CopyIcon />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="nx-gap-4 nx-flex nx-flex-col">
          <div
            className="code-style-outer"
            style={{ overflowX: "scroll", width: "100%" }}
            ref={codeRef}
          >
            {isOSFile ? renderOsBlock() : renderCodeBlock()}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModifiedPre = ({
  children,
  filename,
  hasCopyCode,
}: {
  children?: ReactNode;
  filename?: string;
  hasCopyCode?: boolean;
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    const codeElements = codeRef.current?.querySelectorAll("code");
    const codeText = [...(codeElements ?? [])]
      .map((el) => el.textContent)
      .join("\n");

    if (codeText) {
      navigator.clipboard.writeText(codeText).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 5000);
      });
    }
  };

  return (
    <Pre className={`pre-normal`}>
      <div
        className={`nx-p-2 nx-flex ${
          filename ? "nx-justify-between nx-items-center" : "nx-justify-end"
        } nx-w-full`}
      >
        {filename && <span className="filename">{filename}</span>}
        {hasCopyCode && (
          <div
            onClick={handleCopy}
            className="nx-cursor-pointer nx-ml-auto nx-flex nx-gap-2 nx-items-center"
          >
            {isCopied ? (
              <>
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3359 0.414062C11.5469 0.648438 11.5469 1 11.3359 1.21094L5.14844 7.39844C4.91406 7.63281 4.5625 7.63281 4.35156 7.39844L1.16406 4.21094C0.929688 4 0.929688 3.64844 1.16406 3.4375C1.375 3.20312 1.72656 3.20312 1.9375 3.4375L4.72656 6.22656L10.5391 0.414062C10.75 0.203125 11.1016 0.203125 11.3125 0.414062H11.3359Z"
                    fill="#0B1742"
                  />
                </svg>
                <span className="nx-copy-text">Copied</span>
              </>
            ) : (
              // <CopyIcon />
              <></>
            )}
          </div>
        )}
      </div>
      <div ref={codeRef}>{children}</div>
    </Pre>
  );
};

export const CodeGroup: React.FC<CodeGroupProps> = ({
  children,
  isOSFile,
  isLocalHostedFile,
  hasCopy,
}: CodeGroupProps): React.ReactElement | null => {
  const codeBlocks = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<CodeBlockProps> => {
      return React.isValidElement(child) && "local" in child.props;
    },
  );

  const osBlocks = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<CodeBlockProps> => {
      if (!React.isValidElement(child)) return false;

      const { props } = child;
      return "windows" in props || "mac" in props || "ubuntu" in props;
    },
  );

  const [firstChild] = React.Children.toArray(children);
  if (React.isValidElement(firstChild)) {
    const modifiedFirstChild = React.cloneElement(
      firstChild as React.ReactElement<CodeGroupProps>,
      {
        isLocalHostedFile,
        isOSFile,
        hasCopy,
        codeBlocks,
        osBlocks,
      },
    );

    return modifiedFirstChild;
  }

  return <>{children}</> || null;
};

export const DocsCode: React.FC<CodeGroupProps> = ({
  codeBlocks,
  isLocalHostedFile,
  isOSFile,
  hasCopy,
  osBlocks,
}) => {
  return (
    <div className="nx-mt-3">
      <CustomPre
        isLocalHostedFile={isLocalHostedFile}
        isOSFile={isOSFile}
        hasCopyCode={hasCopy}
        codeBlocks={codeBlocks}
        osBlocks={osBlocks}
      />
    </div>
  );
};
