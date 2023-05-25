import { type LinkProps } from "next/link";
import { type UrlObject } from "url";

export interface ButtonProps extends Omit<LinkProps, "href"> {
  href?: string | UrlObject;
  tag?: "button" | "a";
  outline?: boolean;
  centered?: boolean;
  color?: "primary" | "secondary" | "danger" | "ghost";
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export interface ButtonElProps extends React.HTMLAttributes<HTMLElement> {
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

export interface ButtonLinkProps {
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  href?: string | UrlObject;
}
