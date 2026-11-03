import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArrowLeft, ArrowUpRight, Eye } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PdfViewer from "@/components/credentials/PdfViewer";
import { credentialDocuments } from "@/data/credentials";

function documentExists(filePath: string) {
  return existsSync(join(process.cwd(), "public", filePath));
}

export function generateStaticParams() {
  return credentialDocuments
    .filter((document) => documentExists(document.filePath))
    .map((document) => ({ slug: document.slug }));
}

export const dynamicParams = false;

export default async function CredentialViewerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const document = credentialDocuments.find((item) => item.slug === slug);

  if (!document || !documentExists(document.filePath)) {
    notFound();
  }

  return (
    <main className="credential-viewer-page">
      <header className="credential-viewer-header">
        <Link className="credential-back-link" href="/#education">
          <ArrowLeft aria-hidden="true" size={15} />
          <span>Back to Education &amp; Credentials</span>
        </Link>
        <p className="credential-viewer-label"><Eye aria-hidden="true" size={13} /> VIEW ONLY · PDF DOCUMENT</p>
        <h1>{document.title}</h1>
        <p className="credential-viewer-hint">Use the PDF viewer controls to zoom and move between pages.</p>
      </header>
      <PdfViewer src={encodeURI(`/${document.filePath}`)} title={document.title} />
      <Link className="credential-close-link" href="/#education">
        Close viewer <ArrowUpRight aria-hidden="true" size={13} />
      </Link>
    </main>
  );
}
