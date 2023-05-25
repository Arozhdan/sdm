import { useState, type FC } from "react";
import cn from "classnames";
import styles from "./Select.module.css";
import { type SelectProps } from "./Select.props";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const mockOptions = [
  {
    label: "Выбрать сферу / цель разбора",
    value: "any",
  },
  {
    label: "Маркетинг и реклама",
    value: "marketing",
  },

  {
    label: "Разработка сайтов",
    value: "web",
  },
  {
    label: "Дизайн и графика",
    value: "design",
  },
  {
    label: "Мобильные приложения",
    value: "mobile",
  },
  {
    label: "Аудио и видео",
    value: "audio",
  },
];

export const Select: FC<SelectProps> = ({
  className,
  options = mockOptions,
  color = "primary",
  bottomHint,
  fullWidth = true,
  error,
  ...props
}) => {
  const classes = cn(styles.selectWrapper, styles[color], className, {
    [styles.error || ""]: error,
    [styles.fullWidth || ""]: fullWidth,
  });
  const [selected, setSelected] = useState(options[0]);
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label
            ?.toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className={classes}>
        <Combobox.Input
          displayValue={({ label }: { label: string }) => label}
          className={styles.input}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon className={styles.icon} aria-hidden="true" />
        </Combobox.Button>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <Combobox.Option
                  key={option.value}
                  className={({ active }) =>
                    `relative  cursor-pointer select-none py-2 pl-4 pr-4 ${
                      active ? "bg-primary text-white" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {option.label}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};
