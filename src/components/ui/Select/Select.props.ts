export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: Record<string, string>[];
  color?: "primary" | "ghost";
  error?: boolean;
  bottomHint?: string;
  fullWidth?: boolean;
}
