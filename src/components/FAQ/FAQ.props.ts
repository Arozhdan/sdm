import { type FAQ } from "~/models/api";

export interface FAQProps extends React.HTMLAttributes<HTMLDivElement> {
  faqs?: FAQ[];
}
