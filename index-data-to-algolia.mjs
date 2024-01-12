// indexDataToAlgolia.js
import algoliasearch from "algoliasearch";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import striptags from "striptags";

const client = algoliasearch("J27DIPDG4S", "xxxx");
const index = client.initIndex("first_index");

const docsPath = path.join(process.cwd(), "pages");

const extractProps = (componentDeclaration) => {
  // Basic props extraction from a simple JSX-like syntax
  const propsRegex = /(\w+)\s*=\s*{(.*?)}/g;
  const props = {};
  let match;
  while ((match = propsRegex.exec(componentDeclaration)) !== null) {
    const propName = match[1];
    const propValue = match[2];
    props[propName] = propValue;
  }
  return props;
};

const extractContent = (fileContent, maxChunkSize) => {
  const lines = fileContent.split("\n");
  const contentSections = [];
  let currentTitle = null;
  let currentContent = [];
  let currentProps = null;

  for (const line of lines) {
    if (line.startsWith("#")) {
      // Save the previous section
      if (currentTitle !== null) {
        const fullContent = currentContent.join(" ").trim();
        if (fullContent.length > maxChunkSize) {
          // Break content into chunks
          let start = 0;
          let chunkNumber = 1;
          while (start < fullContent.length) {
            const chunk = fullContent.substr(start, maxChunkSize);
            contentSections.push({
              title: `${currentTitle} (Part ${chunkNumber})`,
              content: striptags(chunk.trim()), // Strip HTML tags
              props: currentProps, // Include the props
            });
            start += maxChunkSize;
            chunkNumber++;
          }
        } else {
          contentSections.push({
            title: currentTitle.trim(),
            content: striptags(fullContent), // Strip HTML tags
            props: currentProps, // Include the props
          });
        }
      }

      // Start a new section
      currentTitle = line.replace("#", "").trim();
      currentContent = [];
      currentProps = null;

      // Extract props from the line (assuming a simple JSX-like syntax)
      const match = line.match(/<(\w+)(.*?)>/);
      if (match) {
        const componentProps = match[2];
        currentProps = extractProps(componentProps);
      }
    } else {
      // Continue adding content to the current section
      currentContent.push(line);
    }
  }

  // Save the last section
  if (currentTitle !== null) {
    const fullContent = currentContent.join(" ").trim();
    if (fullContent.length > maxChunkSize) {
      // Break content into chunks
      let start = 0;
      let chunkNumber = 1;
      while (start < fullContent.length) {
        const chunk = fullContent.substr(start, maxChunkSize);
        contentSections.push({
          title: `${currentTitle} (Part ${chunkNumber})`,
          content: striptags(chunk.trim()), // Strip HTML tags
          props: currentProps, // Include the props
        });
        start += maxChunkSize;
        chunkNumber++;
      }
    } else {
      contentSections.push({
        title: currentTitle.trim(),
        content: striptags(fullContent), // Strip HTML tags
        props: currentProps, // Include the props
      });
    }
  }

  return contentSections;
};

const indexData = async (dir) => {
  const records = [];

  const readFiles = (dir) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        readFiles(filePath); // Recursively process subdirectories
      } else if (path.extname(file).toLowerCase() === ".mdx") {
        const content = fs.readFileSync(filePath, "utf8");
        const { content: fileContent } = matter(content);

        // Usage example with a max chunk size of 9000 bytes
        const contentSections = extractContent(fileContent, 9000);

        for (const section of contentSections) {
          records.push({
            objectID: `${filePath}_${section.title}`,
            title: section.title,
            path: `/docs${
              filePath.split("docs_v2/pages")[1].split(".")[0]
            }#${section.title
              .replaceAll("#", "")
              .toLowerCase()
              .split(" ")
              .join("-")
              .replace(/^-/, "")}`,
            content: section.content,
          });
        }
      }
    }
  };

  readFiles(dir);

  // Push records to Algolia index
  try {
    await index.saveObjects(records);
    console.log("Data indexed successfully.");
  } catch (error) {
    console.error("Error indexing data:", error);
  }
};

// Run the indexing function
indexData(docsPath);
