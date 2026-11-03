import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Md Shaqib Hussain — Data Scientist & AI/ML Engineer",
  description:
    "Portfolio of Md Shaqib Hussain: data and AI professional building practical machine learning systems, meaningful analytics, and intelligent products.",
  applicationName: "Md Shaqib Hussain Portfolio",
  openGraph: {
    title: "Md Shaqib Hussain — Data Scientist & AI/ML Engineer",
    description:
      "Turning complex data into useful intelligence through analytics, machine learning, and AI.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f7f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
