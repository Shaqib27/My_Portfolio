"use client";

import { ChevronLeft, ChevronRight, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PDFDocumentLoadingTask, PDFDocumentProxy, RenderTask } from "pdfjs-dist";

export default function PdfViewer({ src, title }: { src: string; title: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [containerWidth, setContainerWidth] = useState(0);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const container = pageContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(Math.floor(entry.contentRect.width));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let loadingTask: PDFDocumentLoadingTask | null = null;

    async function loadDocument() {
      setLoading(true);
      setError("");
      setPageCount(0);

      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        loadingTask = pdfjs.getDocument({ url: src });
        const pdf = await loadingTask.promise;

        if (cancelled) {
          await loadingTask.destroy();
          return;
        }

        documentRef.current = pdf;
        setPageCount(pdf.numPages);
        setPageNumber(1);
      } catch (reason) {
        if (!cancelled) {
          setError(reason instanceof Error ? `Unable to display this PDF: ${reason.message}` : "Unable to display this PDF.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadDocument();

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
      documentRef.current = null;
      if (loadingTask) void loadingTask.destroy();
    };
  }, [src, retry]);

  useEffect(() => {
    const pdf = documentRef.current;
    const canvas = canvasRef.current;
    if (!pdf || !canvas || !containerWidth) return;
    const loadedDocument = pdf;
    const canvasElement = canvas;

    let cancelled = false;
    renderTaskRef.current?.cancel();

    async function renderPage() {
      try {
        const page = await loadedDocument.getPage(pageNumber);
        if (cancelled) return;

        const baseViewport = page.getViewport({ scale: 1 });
        const fitScale = Math.max(1, containerWidth - 36) / baseViewport.width;
        const viewport = page.getViewport({ scale: fitScale * zoom / 100 });

        const pixelRatio = window.devicePixelRatio || 1;
        canvasElement.width = Math.ceil(viewport.width * pixelRatio);
        canvasElement.height = Math.ceil(viewport.height * pixelRatio);
        canvasElement.style.width = `${viewport.width}px`;
        canvasElement.style.height = `${viewport.height}px`;
        const transform: [number, number, number, number, number, number] | undefined =
          pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0];

        const renderTask = page.render({ canvas: canvasElement, viewport, transform });
        renderTaskRef.current = renderTask;
        await renderTask.promise;
      } catch (reason) {
        if (cancelled || (reason instanceof Error && reason.name === "RenderingCancelledException")) return;
        setError(reason instanceof Error ? `Unable to render this PDF page: ${reason.message}` : "Unable to render this PDF page.");
      }
    }

    void renderPage();
    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
    };
  }, [containerWidth, pageNumber, zoom, pageCount]);

  return (
    <div className="credential-pdf-viewer">
      <div className="credential-viewer-controls" aria-label="PDF viewing controls">
        <div className="pdf-page-controls">
          <button
            aria-label="Previous page"
            disabled={pageNumber <= 1 || loading || Boolean(error)}
            onClick={() => setPageNumber((current) => Math.max(1, current - 1))}
            type="button"
          >
            <ChevronLeft aria-hidden="true" size={16} />
          </button>
          <span aria-live="polite">PAGE {pageCount ? pageNumber : "—"} OF {pageCount || "—"}</span>
          <button
            aria-label="Next page"
            disabled={!pageCount || pageNumber >= pageCount || loading || Boolean(error)}
            onClick={() => setPageNumber((current) => Math.min(pageCount, current + 1))}
            type="button"
          >
            <ChevronRight aria-hidden="true" size={16} />
          </button>
        </div>
        <div className="pdf-zoom-controls">
          <button
            aria-label="Zoom out"
            disabled={zoom <= 50 || loading || Boolean(error)}
            onClick={() => setZoom((current) => Math.max(50, current - 25))}
            type="button"
          >
            <ZoomOut aria-hidden="true" size={15} />
          </button>
          <span aria-live="polite">{zoom}%</span>
          <button
            aria-label="Zoom in"
            disabled={zoom >= 200 || loading || Boolean(error)}
            onClick={() => setZoom((current) => Math.min(200, current + 25))}
            type="button"
          >
            <ZoomIn aria-hidden="true" size={15} />
          </button>
          <button
            aria-label="Fit page to viewer"
            disabled={zoom === 100 || loading || Boolean(error)}
            onClick={() => setZoom(100)}
            type="button"
          >
            <RotateCcw aria-hidden="true" size={14} />
          </button>
        </div>
      </div>
      <div className="credential-pdf-page" ref={pageContainerRef}>
        {loading && <p className="pdf-viewer-status" role="status">Loading certificate…</p>}
        {error ? (
          <div className="pdf-viewer-error" role="alert">
            <p>{error}</p>
            <button onClick={() => setRetry((current) => current + 1)} type="button">Try again</button>
          </div>
        ) : (
          <canvas aria-label={`${title}, page ${pageNumber} of ${pageCount || "…"}`} ref={canvasRef} />
        )}
      </div>
    </div>
  );
}
