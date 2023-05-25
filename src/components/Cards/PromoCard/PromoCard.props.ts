import { type LinkProps } from "next/link";

export interface PromoCardProps extends LinkProps {
  title: string;
  description: string;
  src: string;
  alt: string;
  tag?: string;
  className?: string;
}
