import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";

const SearchSidebar = async ({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) => {
  const prices = [
    { price: PRICE.CHEAP, label: "$$", className: "rounded-l" },
    { price: PRICE.REGULAR, label: "$$$", className: "" },
    { price: PRICE.EXPENSIVE, label: "$$$$", className: "rounded-r" },
  ];

  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col ">
        <h1 className="mb-2">Region</h1>
        {locations.map((location) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                city: location.name,
              },
            }}
            key={location.id}
            className="font-light text-reg"
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                cuisine: cuisine.name,
              },
            }}
            key={cuisine.id}
            className="font-light text-reg"
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ price, label, className }) => (
            <Link
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  price,
                },
              }}
              className={`border w-full text-reg text-center font-light ${className} p-2`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SearchSidebar;
