import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

import CustomCodeBlock from "./custome-code-blocks";

interface MarkdownRendererProperties {
  markdownContent: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProperties> = ({
  markdownContent,
}) => {
  return (
    <ReactMarkdown
      skipHtml={false}
      components={{ code: CustomCodeBlock }}
      rehypePlugins={[rehypeSanitize]}
    >
      {markdownContent}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
