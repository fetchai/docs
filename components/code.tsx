import React, { useState, ReactNode, useRef } from "react";
import { Pre } from "nextra/components";
import { CodeIcon, CopyIcon } from "src/icons/shared-icons";
import { Windows, Mac, Ubuntu } from "src/icons/os-icons";

interface CodeGroupProps {
  children: ReactNode;
  isOSFile?: boolean;
  isLocalHostedFile?: boolean;
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
};

const osmenu = [
  { name: "windows", icon: Windows },
  { name: "mac", icon: Mac },
  { name: "ubuntu", icon: Ubuntu },
];

export const CodeBlockHeader = ({
  onOSChange,
  handleSelect,
  selectedType,
  selectedOS,
  isOSFile = false,
  isLocalHostedFile = false,
}: {
  filename: string;
  onOSChange: (os: string) => void;
  handleSelect: (type: "local" | "hosted") => void;
  selectedType: string;
  selectedOS: string;
  isOSFile: boolean;
  isLocalHostedFile: boolean;
}) => {
  return (
    <div className="nx-flex nx-gap-3">
      {isOSFile && (
        <div className="osmenu-container-nav nx-w-[132px]">
          {osmenu.map((item, index) => (
            <div
              key={index}
              className={`osmenu-tab-container nx-justify-center nx-cursor-pointer nx-items-center ${
                selectedOS === item.name ? "blue-background" : ""
              }`}
              onClick={() => onOSChange(item.name)}
            >
              <item.icon selectedOS={selectedOS} name={item.name} />
            </div>
          ))}
        </div>
      )}

      {isLocalHostedFile && (
        <div className="osmenu-container-nav nx-gap-3">
          <div
            className={`osmenu-tab-new nx-justify-center hover:blue-background nx-px-2 nx-cursor-pointer nx-items-center hover:nx-bg-[#efebff] ${
              selectedType === "local" ? "blue-background" : ""
            }`}
            onClick={() => handleSelect("local")}
          >
            <span>Local Agent</span>
          </div>
          <div
            className={`osmenu-tab-new nx-justify-center hover:blue-background nx-px-2 nx-cursor-pointer nx-items-center hover:nx-bg-[#efebff] ${
              selectedType === "hosted" ? "blue-background" : ""
            }`}
            onClick={() => handleSelect("hosted")}
          >
            <span>Hosted Agent</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const CustomPre: React.FC<CodeBoxProps> = ({
  filename,
  dataLanguage,
  hasCopyCode,
  children,
}) => {
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
    <div className="nx-flex nx-flex-col">
      <Pre data-language={dataLanguage} className="custom-pre">
        <div className="nx-flex nx-w-full nx-items-center nx-justify-between">
          <CodeIcon />
          <div>
            {filename && <span className="nx-code-name">{filename}</span>}
          </div>
          {hasCopyCode && (
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
        </div>
        <div
          className="code-style-outer"
          style={{ overflowX: "scroll", width: "100%" }}
          ref={codeRef}
        >
          {children}
        </div>
      </Pre>
    </div>
  );
};

export const CodeGroup: React.FC<CodeGroupProps> = ({
  children,
  isOSFile,
  isLocalHostedFile,
}) => {
  const [selectedType, setSelectedType] = useState<"local" | "hosted">("local");
  const [selectedOS, setSelectedOS] = useState("windows");

  const handleSelect = (type: "local" | "hosted") => setSelectedType(type);
  const handleOSChange = (os: string) => setSelectedOS(os);

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
      local: /local/i,
      hosted: /hosted/i,
      windows: /windows/i,
      mac: /mac/i,
      ubuntu: /ubuntu/i,
    };
    return (
      regexMap[selectedType]?.test(filename) ||
      regexMap[selectedOS.toLowerCase()]?.test(filename)
    );
  };

  return (
    <div className="nx-mt-3">
      <CodeBlockHeader
        isOSFile={isOSFile}
        isLocalHostedFile={isLocalHostedFile}
        handleSelect={handleSelect}
        filename={selectedType}
        onOSChange={handleOSChange}
        selectedType={selectedType}
        selectedOS={selectedOS}
      />
      <div className="nx-mt-3">{renderChild()}</div>
    </div>
  );
};
