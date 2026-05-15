"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Header from "./Header";
import Footer from "./Footer";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import { useCountriesByCodes, useCountryByCode } from "@/hooks/useCountries";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) => (
  <p className="text-sm">
    <span className="font-semibold text-foreground">{label}:</span>{" "}
    <span className="text-muted-foreground">{value || "N/A"}</span>
  </p>
);

const CountryDetailConntainer = () => {
  const code = useParams<{ code: string }>();
  const navigate = useRouter();
  const [search, setSearch] = useState("");
  const { data: country, isLoading } = useCountryByCode(code.code || "");
  const { data: borderCountries } = useCountriesByCodes(country?.borders || []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header search={search} setSearch={setSearch} showSearch={false} />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-32 mb-8" />
          <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!country) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header search={search} setSearch={setSearch} showSearch={false} />
        <main className="flex-1 container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground text-lg">Country not found.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate.push("/")}
          >
            Go Home
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0]?.common
    : undefined;
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : undefined;
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(", ")
    : undefined;
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header search={search} setSearch={setSearch} showSearch={false} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="outline"
          className="mb-8 gap-2"
          onClick={() => navigate.back()}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full rounded-lg shadow-md"
            loading="eager"
            priority
            width={600}
            height={400}
          />
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">
              {country.name.common}
            </h1>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
              <InfoRow label="Official Name" value={country.name.official} />
              <InfoRow label="Native Name" value={nativeName} />
              <InfoRow
                label="Population"
                value={country.population.toLocaleString()}
              />
              <InfoRow label="Region" value={country.region} />
              <InfoRow label="Subregion" value={country.subregion} />
              <InfoRow label="Capital" value={country.capital?.join(", ")} />
              <InfoRow
                label="Area"
                value={
                  country.area
                    ? `${country.area.toLocaleString()} km²`
                    : undefined
                }
              />
              <InfoRow label="Languages" value={languages} />
              <InfoRow label="Currencies" value={currencies} />
              <InfoRow
                label="Timezones"
                value={country.timezones?.join(", ")}
              />
            </div>

            {borderCountries && borderCountries.length > 0 && (
              <div>
                <h2 className="font-semibold text-foreground mb-3">
                  Border Countries
                </h2>
                <div className="flex flex-wrap gap-2">
                  {borderCountries.map((b) => (
                    <Link
                      key={b.cca3}
                      href={`/country/${b.cca3}`}
                      className="inline-block"
                    >
                      <Badge
                        variant="secondary"
                        className="cursor-pointer hover:bg-accent transition-colors px-3 py-1.5"
                      >
                        {b.name.common}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CountryDetailConntainer;
