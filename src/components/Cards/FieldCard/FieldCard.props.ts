import { type LinkProps } from "next/link";

export interface FieldCardProps extends LinkProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}
