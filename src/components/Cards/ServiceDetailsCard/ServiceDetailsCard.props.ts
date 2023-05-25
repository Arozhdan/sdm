import { type LinkProps } from "next/link";

export interface ServiceDetailsCardProps extends LinkProps {
  className?: string;
  title: string;
  index?: number;
  items?: {
    title: string;
    description?: string;
  }[];
}
