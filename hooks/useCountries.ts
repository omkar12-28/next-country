import { useQuery } from "@tanstack/react-query";

export interface Country {
  cca3: string;
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  flags: { svg: string; png: string; alt?: string };
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  area?: number;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
  timezones?: string[];
  borders?: string[];
}

const fetchAllCountries = async (): Promise<Country[]> => {
  const [mainRes, extraRes] = await Promise.all([
    fetch(
      "https://restcountries.com/v3.1/all?fields=cca3,name,flags,population,region,capital,languages,currencies,timezones,borders",
    ),
    fetch(
      "https://restcountries.com/v3.1/all?fields=cca3,subregion,area",
    ),
  ]);

  if (!mainRes.ok || !extraRes.ok) {
    throw new Error("Failed to fetch countries");
  }

  const mainData: Country[] = await mainRes.json();
  const extraData: Partial<Country>[] = await extraRes.json();

  const extraMap = new Map<string, Partial<Country>>(
    extraData.map((country) => [country.cca3!, country]),
  );

  return mainData.map((country) => ({
    ...country,
    ...(extraMap.get(country.cca3) ?? {}),
  }));
};

export const useCountries = () =>
  useQuery<Country[], Error>({
    queryKey: ["countries"],
    queryFn: fetchAllCountries,
    staleTime: 1000 * 60 * 30,
  });

export const useCountryByCode = (code: string) => {
  const { data: countries, ...rest } = useCountries();
  const country = countries?.find((c) => c.cca3 === code);
  return { data: country, ...rest };
};

export const useCountriesByCodes = (codes: string[]) => {
  const { data: countries, ...rest } = useCountries();
  const matched = countries?.filter((c) => codes.includes(c.cca3));
  return { data: matched, ...rest };
};
