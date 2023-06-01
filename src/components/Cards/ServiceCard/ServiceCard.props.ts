import { type LinkProps } from "next/link";
import { type Media } from "~/models/api";

export interface ServiceCardProps extends Omit<LinkProps, "href"> {
  className?: string;
  title: string;
  label?: string;
  image?: {
    data: {
      attributes: Media;
    };
  };
  slug: string;
  promo?: boolean;
  hiddenTitle?: boolean;
  darkTitle?: boolean;
}
