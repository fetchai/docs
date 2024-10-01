import React, { useState, ReactNode, useRef } from "react";
import { Pre } from "nextra/components";
import { CopyIcon, DropDownArrow } from "src/icons/shared-icons";
import { Windows, Mac, Ubuntu } from "src/icons/os-icons";
import { useEffect } from "react";
import { motion } from "framer-motion";
interface CodeGroupProps {
  children: ReactNode;
  isOSFile?: boolean;
  isLocalHostedFile?: boolean;
  hasCopy?: boolean;
}

interface CodeBlockProps {
  filename: string;
  dataLanguage?: string;
}

type CodeBoxProps = {
  filename?: string;
  dataLanguage?: string;
  hasCopyCode?: boolean;
  children?: React.ReactNode;
  isOSFile?: boolean;
  isLocalHostedFile?: boolean;
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

export const MyComponent: React.FC<{
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
      <div ref={codeRef} style={{ overflowX: "scroll", width: "100%" }}>
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
  children,
  isLocalHostedFile,
  isOSFile,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const [selectedType, setSelectedType] = useState(agentType[0].name);
  const [selectedOS, setSelectedOS] = useState("windows");

  const renderChild = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement<CodeBlockProps>(child)) {
        return matchFilename(child.props.filename) ? child : null;
      }
      return null;
    });
  };

  const matchFilename = (filename: string): boolean => {
    const regexMap = {
      self_hosted: /local/i,
      agentverse: /hosted/i,
      windows: /windows/i,
      mac: /mac/i,
      ubuntu: /ubuntu/i,
    };

    return (
      regexMap[selectedType.split(" ").join("_").toLowerCase()]?.test(
        filename,
      ) || regexMap[selectedOS.toLowerCase()]?.test(filename)
    );
  };

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
      <div className="custom-pre">
        <div className="nx-w-full nx-flex nx-justify-between">
          <div className="nx-flex nx-gap-3">
            {isLocalHostedFile && (
              <Dropdown
                selectedOption={selectedType}
                onOptionSelect={setSelectedType}
                placeholder="Select Language"
                options={agentType.map((item) => item.name)}
              />
            )}
            {isOSFile && (
              <Dropdown
                selectedOption={selectedOS}
                onOptionSelect={setSelectedOS}
                placeholder="Select Language"
                options={osmenu.map((item) => item.name)}
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
            {renderChild()}
          </div>
        </div>
      </div>
    </div>
  );
};

const isLocalOrHosted = (name?: string) =>
name?.startsWith("local-") || name?.startsWith("hosted-");

export const ModifiedPre = ({
  children,
  filename,
}: {
  children?: ReactNode;
  filename?: string;
}) => {
  const osMenu = ["windows", "mac", "ubuntu"];

  const shouldApplyPreNormal = Boolean(filename && isLocalOrHosted(filename));

  if (osMenu.includes(filename || "")) {
    return (
      <div>
        <span className="filename">
          {filename?.replace(/^(local-|hosted-)/, "")}
        </span>
        <div>{children}</div>
      </div>
    );
  }

  return (
    <Pre className={shouldApplyPreNormal ? "" : "pre-normal"}>
      {filename && (
        <span className="filename">
          {filename.replace(/^(local-|hosted-)/, "")}
        </span>
      )}
      {children}
    </Pre>
  );
};


export const CodeGroup: React.FC<CodeGroupProps> = ({
  children,
  isOSFile,
  isLocalHostedFile,
  hasCopy,
}) => {
  return (
    <div className="nx-mt-3">
      <CustomPre
        isLocalHostedFile={isLocalHostedFile}
        isOSFile={isOSFile}
        hasCopyCode={hasCopy}
      >
        {children}
      </CustomPre>
    </div>
  );
};
