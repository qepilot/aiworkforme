import type { Metadata } from "next";

const title = "Create your account — AI Work For Me";
const description =
  "Create a free AI Work For Me account, then connect Jira, Notion, Slack, WhatsApp, or GitHub and bring your own model keys — no credit card required.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/sign-up",
  },
  openGraph: {
    title,
    description,
    url: "/sign-up",
  },
  twitter: {
    title,
    description,
  },
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
