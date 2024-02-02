import fs from "node:fs";
import glob from "node:glob";

function extractFunctionInfo(mdxContent) {
  const codeBlockPattern = /```py[\S\s]*?```/g;

  const codeBlocks = mdxContent.match(codeBlockPattern);
  const functionInfo = [];
  const function_name_pattern = /def\s+([^(]+)\(/;
  const parameters_pattern = /def\s+[A-Z_a-z]\w*\s*\(([^)]*)\)/;
  if (codeBlocks) {
    for (const codeBlock of codeBlocks) {
      const codeBlockRefined1 = codeBlock
        .replace("```python", "")
        .replace("```py copy", "")
        .replace("```", "")
        .replace("\n", "");
      const functionName = codeBlockRefined1.match(function_name_pattern);
      if (functionName) {
        const parametersString = codeBlockRefined1.match(parameters_pattern);
        const parametersList = parametersString[1].split(",");
        const parameters = parametersList.map((parameter) => {
          const refinedList = parameter.replace("\n", "").trim();
          return refinedList;
        });

        functionInfo.push({
          name: functionName[1],
          parameters: parameters,
        });
      }
    }
  }

  return functionInfo;
}

function generateNewPage(functionInfo) {
  const newPageContent = JSON.stringify(functionInfo, null, 2);
  fs.writeFileSync("function_docs.json", newPageContent);
}

function processDirectory(directoryPath) {
  const functionInfoAll = [];
  console.log("starting to read files...");
  try {
    const files = glob.sync(`${directoryPath}/**/*.mdx`);

    for (const filePath of files) {
      const mdxContent = fs.readFileSync(filePath, "utf8");
      const functionInfo = extractFunctionInfo(mdxContent);
      functionInfo ? functionInfoAll.push(...functionInfo) : "";
    }

    generateNewPage(functionInfoAll);
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

processDirectory("~/docs-v2/pages/guides");
