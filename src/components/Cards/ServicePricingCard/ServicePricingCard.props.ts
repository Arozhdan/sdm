import { type LinkProps } from "next/link";
import type React from "react";

export interface ServicePricingCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  link?: string;
  index?: number;
  discount: number;
  href?: string;
}
