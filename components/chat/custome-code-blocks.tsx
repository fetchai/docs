"use client";
import { ModifiedPre } from "components/code";
import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const CustomCodeBlock = ({
  children,
}: {
  children: React.ReactNode | string;
}) => {
  const [numberLines, setNumberLines] = useState<number>(0);

  useEffect(() => {
    const text = typeof children === "string" ? children : children?.toString();
    const lines = text?.split("\n").filter(Boolean).length;
    setNumberLines(lines ?? 0);
  }, [children]);

  if (numberLines === 1) {
    return (
      <div className="nx-inline-flex">
        <SyntaxHighlighter
          id="code-single"
          language="python"
          style={{
            margin: "0px",
          }}
          wrapLines={true}
          wrapLongLines={true}
        >
          {children as string}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <div className="nx-py-4">
      <ModifiedPre>{children}</ModifiedPre>
    </div>
  );
};
export default CustomCodeBlock;
