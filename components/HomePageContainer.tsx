'use client';
import { useState } from "react";
import CountryCard from '@/components/CountryCard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import RegionFilters from '@/components/RegionFilters';
import { useCountries } from '@/hooks/useCountries';
import { Skeleton } from "./ui/skeleton";

const HomePageContainer = () => {
    const { data: countries, isLoading, error } = useCountries();
    const [search, setSearch] = useState("");
    const [region, setRegion] = useState("All");

    const filtered = countries?.filter((country) => {
        const matchesSearch = country.name.common.toLowerCase().includes(search.toLowerCase());
        const matchesRegion = region === "All" || country.region === region;
        return matchesSearch && matchesRegion;
    }) || [];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header search={search} setSearch={setSearch} />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <h1 className="text-2xl font-bold text-foreground">
                        {search || region !== "All"
                            ? `${filtered.length} ${filtered.length === 1 ? "country" : "countries"} found`
                            : "Explore the World"}
                    </h1>
                    <RegionFilters region={region} setRegion={setRegion} />
                </div>
                {error && (
                    <div className="text-center py-20">
                        <p className="text-destructive text-lg">Failed to load countries. Please try again later.</p>
                    </div>
                )}

                {isLoading && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="overflow-hidden rounded-lg border bg-card shadow-sm"
                            >
                                {/* Flag */}
                                <Skeleton className="h-40 w-full" />

                                {/* Content */}
                                <div className="space-y-3 p-4">
                                    <Skeleton className="h-6 w-3/4" />

                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-5/6" />
                                        <Skeleton className="h-4 w-2/3" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && !error && filtered.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">No countries match your search.</p>
                    </div>
                )}

                {!isLoading && !error && filtered.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.map((country) => (
                            <CountryCard key={country.cca3} country={country} />
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    )
}

export default HomePageContainer