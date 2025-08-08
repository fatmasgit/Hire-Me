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
import { Majors } from "../../utils/filters";

export default function SelectMajor({ selectedMajor, setselectedMajor }) {
  const { i18n } = useTranslation();
  const direction = i18n.dir(i18n.language);
  const [query, setQuery] = useState("");

  const filteredMajors =
    query === ""
      ? Majors
      : Majors.filter((major) => {
          const q = query.toLowerCase();
          return (
            major?.name?.toLowerCase().includes(q) ||
            major?.arabicName?.toLowerCase().includes(q)
          );
        });

  return (
    <div className="mx-auto w-full">
      <Combobox
        value={selectedMajor}
        onChange={(value) => setselectedMajor(value || "")}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              `w-full rounded-md border-none px-3 py-1.5 text-sm/6 text-[#808184] placeholder:text-[#808184] xs:h-9 xs:text-xs sm:h-10 sm:text-sm`,
              "bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 ltr:font-PoppinsRegular rtl:font-TajawalMedium",
            )}
            displayValue={(major) =>
              direction === "rtl" ? major?.arabicName : major?.name
            }
            onChange={(event) => setQuery(event.target.value)}
            placeholder={direction === "rtl" ? "اختر التخصص" : "Select Major"}
          />
          <ComboboxButton
            className={`group absolute inset-y-0 ${direction === "rtl" ? "left-0" : "right-0"} px-2.5 text-[#808184]`}
          >
            <ChevronDownIcon className="size-4 fill-[#808184] group-data-[hover]:fill-[#3B235D] sm:size-5" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--input-width)] border border-white/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible xs:mt-1.5 xs:rounded-md",
            "!max-h-[15rem] !overflow-y-auto",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
          )}
        >
          {filteredMajors.length === 0 ? (
            <div className="py-2 text-center text-[#808184] xs:text-xs sm:text-sm">
              {direction === "rtl" ? "لا توجد نتائج" : "No results found"}
            </div>
          ) : (
            filteredMajors.map((major, i) => (
              <ComboboxOption
                dir={direction}
                key={i}
                value={major}
                className="group flex cursor-default select-none items-center gap-2 truncate rounded-lg px-3 py-1.5 font-PoppinsRegular data-[focus]:bg-[#d6c8ea] xs:h-9"
              >
                <CheckIcon className="size-4 scale-0 fill-[#3B235D] group-data-[focus]:scale-100" />
                <div className="text-[#808184] xs:text-xs sm:text-sm ltr:font-PoppinsRegular rtl:font-TajawalMedium">
                  {direction === "rtl" ? major?.arabicName : major?.name}
                </div>
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
