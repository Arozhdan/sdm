export interface TextAreaProps
  extends React.HtmlHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  showLabel?: boolean;
  fullWidth?: boolean;
  topHint?: string;
  bottomHint?: string;
  error?: string;
  color?: "primary" | "ghost";
  value?: string;
}
