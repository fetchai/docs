import gitUrlParse from "git-url-parse";
import { useConfig } from "../contexts";

export function useGitEditUrl(filePath = ""): string {
  console.log(filePath, "s");
  const config = useConfig();
  const repo = gitUrlParse(config.docsRepositoryBase || "");

  if (!repo) throw new Error("Invalid `docsRepositoryBase` URL!");

  return filePath.includes("/references/uagents/api")
    ? `${repo.href}/${filePath}.md`
    : `${repo.href}/${filePath}.mdx`;
}
