import Link from "next/link";
import type { Country } from "@/hooks/useCountries";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface CountryCardProps {
  country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
  return (
    <Link href={`/country/${country.cca3}`} className="h-full">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full group">
        <div className="aspect-video overflow-hidden">
        <Image
            src={country.flags.svg}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="eager"
            priority
            width={400}
            height={300}
          />
        </div>
        <CardContent className="p-5 space-y-2">
          <h2 className="font-bold text-lg text-foreground truncate">
            {country.name.common}
          </h2>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Population:</span>{" "}
              {country.population.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold text-foreground">Region:</span>{" "}
              {country.region}
            </p>
            <p>
              <span className="font-semibold text-foreground">Capital:</span>{" "}
              {country.capital?.join(", ") || "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CountryCard;
