import { existsSync } from "node:fs";
import { join } from "node:path";
import PortfolioPage from "@/components/portfolio-page";
import { credentialDocuments } from "@/data/credentials";

export default function Home() {
  const availableCredentialIds = credentialDocuments
    .filter((document) => existsSync(join(process.cwd(), "public", document.filePath)))
    .map((document) => document.id);

  return <PortfolioPage availableCredentialIds={availableCredentialIds} />;
}
