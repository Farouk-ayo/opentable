import Header from "./components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Milestone grill (Toronto) || OpenTable",
  description: "search restaurant with all recipe and orders",
};

export default function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <main>
      <Header name={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </main>
  );
}
