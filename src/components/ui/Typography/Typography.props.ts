export interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  variant?:
    | "large"
    | "big"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body-big"
    | "body1"
    | "body2"
    | "body3"
    | "small";
  align?: "left" | "center" | "right";
  weight?: "light" | "regular" | "medium" | "bold";
  underline?: boolean;
  children: React.ReactNode;
  className?: string;
}
