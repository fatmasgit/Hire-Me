import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Cities } from "../../utils/filters";

export default function SelectCity({ selectedCity, setselectedCity }) {
  const [query, setQuery] = useState("");
  const { i18n } = useTranslation();
  const direction = i18n.dir(i18n.language);

  const filteredCities =
    query === ""
      ? Cities
      : Cities.filter((city) => {
          const q = query.toLowerCase();
          return (
            city?.name?.toLowerCase().includes(q) ||
            city?.name_ar?.toLowerCase().includes(q)
          );
        });

  return (
    <div className="mx-auto w-full">
      <Combobox
        value={selectedCity}
        onChange={(value) => setselectedCity(value || "")}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              `w-full rounded-md border-none px-3 py-1.5 text-sm/6 text-[#808184] placeholder:text-[#808184] xs:h-9 xs:text-xs sm:h-10 sm:text-sm`,
              "bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 ltr:font-PoppinsRegular rtl:font-TajawalMedium",
            )}
            displayValue={(city) =>
              direction === "rtl" ? city?.name_ar : city?.name
            }
            onChange={(event) => setQuery(event.target.value)}
            placeholder={direction === "rtl" ? "اختر المدينه" : "Select City"}
          />
          <ComboboxButton
            className={`group absolute inset-y-0 ${
              direction === "rtl" ? "left-0" : "right-0"
            } px-2.5 text-[#808184]`}
          >
            <ChevronDownIcon className="size-4 fill-[#808184] group-data-[hover]:fill-[#3B235D] sm:size-5" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          dir={direction}
          anchor="bottom"
          transition
          className={clsx(
            "!max-h-[15rem] w-[var(--input-width)] !overflow-y-auto border border-white/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible xs:mt-1.5 xs:rounded-md",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
          )}
        >
          {filteredCities.length === 0 ? (
            <div className="py-2 text-center text-[#808184] xs:text-xs sm:text-sm">
              {direction === "rtl" ? "لا توجد نتائج" : "No results found"}
            </div>
          ) : (
            filteredCities.map((city, i) => (
              <ComboboxOption
                dir={direction}
                key={i}
                value={city}
                className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-[#d6c8ea] xs:h-9"
              >
                <CheckIcon className="size-4 scale-0 fill-[#3B235D] group-data-[focus]:scale-100" />
                <div className="text-[#808184] xs:text-xs sm:text-sm ltr:font-PoppinsRegular rtl:font-TajawalMedium">
                  {direction === "rtl" ? city?.name_ar : city?.name}
                </div>
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
