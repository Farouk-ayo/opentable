import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Restaurant || OpenTable",
  description: "search restaurant with all recipe and orders",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
