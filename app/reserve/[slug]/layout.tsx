import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserve at Milestone grill (Toronto) || OpenTable",
  description: "restaurant with all recipe and orders",
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
