export const useNBSP = (text: string) => {
  return text.replace(/ /g, "\u00A0");
};
