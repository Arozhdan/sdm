export interface TestimonialCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  role: string;
  avatar?: string;
  isShort?: boolean;
  quote: string;
  quoteFontSize?: "body2" | "body3";
  quoteMaxLines?: number;
}
