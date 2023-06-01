const dictionaries = {
  ru: () => import("./dictionaries/ru.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale?: "en" | "ru") =>
  dictionaries[locale || "ru"]();

export const setSlot = (text?: string, slot?: string): string =>
  !slot ? text || "" : text?.replace("{slot}", slot) || "";
