import React from "react";
import MonacoEditor from "@monaco-editor/react";

const Editor: React.FC<{
  value?: string | undefined;
  height?: string;
  onChange?: (text: string | undefined) => void;
  readOnly?: boolean | undefined;
}> = ({ value, onChange, readOnly, height }) => {
  return (
    <>
      <div className="my-4 rounded-md p-1 bg-white">
        <MonacoEditor
          options={{
            readOnly,
          }}
          value={value}
          onChange={onChange}
          // className="absolute top-16 bottom-32 left-0 right-0"
          height={height ?? "13vh"}
          defaultLanguage="python"
          // defaultValue="# some comment"
        />
          <button>run</button>
      </div>
    </>
  );
};

export default Editor;