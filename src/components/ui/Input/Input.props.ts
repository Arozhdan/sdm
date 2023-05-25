export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  showLabel?: boolean;
  fullWidth?: boolean;
  topHint?: string;
  bottomHint?: string;
  error?: string;
  color?: "primary" | "ghost";
}
