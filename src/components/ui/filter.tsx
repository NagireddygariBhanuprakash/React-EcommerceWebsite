import { Slider } from "@/components/ui/slider";
import {SlidersHorizontal} from "lucide-react"
import {Label} from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { formatPrice } from "@/lib/utils";

import { useState } from "react";
import { Button } from "./button";

export default function Filters({
  minPrice,
  maxPrice,
  onPriceChange,
  onSortingChanged,
}: {
  maxPrice: number;
  minPrice: number;
  onPriceChange: (value: number[]) => void;
  onSortingChanged: (value: string) => void;
}) {
  const [value, setValue] = useState([minPrice, maxPrice]);
  function onValueChange(value: number[]) {
    setValue(value);
    onPriceChange(value);
  }
  function onSortChange(value: string) {
    onSortingChanged(value);
  }

  function clearFilters(){
    setValue([minPrice,maxPrice])
    onPriceChange([minPrice,maxPrice])
    onSortChange("");
    // onValueChange("");
  }
  const maxValue = Math.round(maxPrice);
  return (
  <Popover>
        <PopoverTrigger>
          <Button variant="ghost">
            <SlidersHorizontal />
          </Button>
        </PopoverTrigger>
      <PopoverContent className="w-full -teanslate-x-4">
          <section className="flex flex-col gap-4">
              <section >
                <Select onValueChange={onSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort Products" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="text-orange-400">
                      <SelectLabel  >Sort Products By</SelectLabel>
                      <SelectItem value="low">Price: Low to High</SelectItem>
                      <SelectItem value="high">Price: High to Low</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </section>
              <section className="flex flex-col gap-2">
                <Label className="text-pink-400">Price Range</Label>
                  <section className="grid grid-cols-[auto_1fr_auton] gap-2">
                    <span className="text-blue-400">{formatPrice(value[0])}</span>
                    <Slider className="min-w-[250px]" value={value} max={maxValue} step={1} onValueChange={onValueChange} />
                    <span className="text-blue-400">{formatPrice(value[1])}</span>
                  </section>
                  
              </section>
              <Button className="w-full" onClick={clearFilters}>Clear Filters</Button>
            </section>
      </PopoverContent>
  </Popover>

    
  );
}