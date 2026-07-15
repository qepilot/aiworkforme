import type { Metadata } from "next";
import { Inter, Fredoka } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsListener from "@/components/AnalyticsListener";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const title = "AI Work For Me — Your tools, your data, your own RAG";
const description =
  "AI Work For Me connects Jira, Notion, Slack, WhatsApp, and GitHub to a private RAG built from your own docs, code, and boards — powered by the AI models you choose.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aiworkforme.com"),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "AI Work For Me",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const organizationAndSoftwareJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://aiworkforme.com/#organization",
      name: "AI Work For Me",
      url: "https://aiworkforme.com",
      logo: "https://aiworkforme.com/favicon.ico",
    },
    {
      "@type": "SoftwareApplication",
      name: "AI Work For Me",
      url: "https://aiworkforme.com",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Connects Jira, Notion, Slack, WhatsApp, and GitHub to a private RAG built from your own docs, code, and boards — powered by the AI models you choose.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: {
        "@id": "https://aiworkforme.com/#organization",
      },
    },
  ],
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <Script
          id="usercentrics-cmp"
          src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
          data-settings-id="KcCY-8NHzQq02U"
          strategy="beforeInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationAndSoftwareJsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AnalyticsListener />
        {gaMeasurementId && <GoogleAnalytics gaId={gaMeasurementId} />}
      </body>
    </html>
  );
}
