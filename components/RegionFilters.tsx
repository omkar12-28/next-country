import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const REGIONS = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"]

interface RegionFiltersProps {
  region: string;
  setRegion: (value: string) => void;
}

const RegionFilters = ({ region, setRegion }: RegionFiltersProps) => {
    const onRegionChange = (value: string) => {
        setRegion(value)
    }

    return (
        <Select value={region} onValueChange={onRegionChange}>
            <SelectTrigger className="w-[200px] bg-background">
                <SelectValue placeholder="Filter by Region" />
            </SelectTrigger>
            <SelectContent>
                {REGIONS.map((r) => (
                    <SelectItem key={r} value={r}>
                        {r === "All" ? "All Regions" : r}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default RegionFilters