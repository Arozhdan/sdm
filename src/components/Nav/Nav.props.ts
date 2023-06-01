import { type getDictionary } from "~/lang";
import { type ValueType } from "~/types";

export interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "agency" | "app";
  dictionary?: ValueType<ReturnType<typeof getDictionary>>;
}
