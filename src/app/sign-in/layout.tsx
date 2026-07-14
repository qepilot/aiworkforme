import type { Metadata } from "next";

const title = "Sign in — AI Work For Me";
const description =
  "Sign in to your AI Work For Me dashboard to access your connected tools, models, and private knowledge base.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/sign-in",
  },
  openGraph: {
    title,
    description,
    url: "/sign-in",
  },
  twitter: {
    title,
    description,
  },
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children;
}
