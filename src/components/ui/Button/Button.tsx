import React, { type FC } from "react";
import Link from "next/link";
import cn from "classnames";
import {
  type ButtonLinkProps,
  type ButtonElProps,
  type ButtonProps,
} from "./Button.props";
import styles from "./Button.module.css";

export const Button: FC<ButtonProps> = (props) => {
  const {
    tag = "button",
    size = "medium",
    color = "secondary",
    outline = false,
    centered = false,
    onClick,
    className,
    ...rest
  } = props;
  const classes = cn(
    styles.button,
    styles[size],
    styles[color],
    {
      [styles.outline || ""]: outline,
      [styles.centered || ""]: centered,
    },
    className
  );

  if (tag === "button") {
    return <ButtonTag onClick={onClick} className={classes} {...rest} />;
  }
  return <LinkTag className={classes} {...rest} />;
};

const ButtonTag: FC<ButtonElProps> = ({
  className,
  children,
  icon,
  onClick,
  type = "button",
}) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children} {icon && icon}
    </button>
  );
};

const LinkTag: FC<ButtonLinkProps> = ({
  className = "",
  href = "",
  children,
  icon,
}) => (
  <Link href={href} className={className}>
    {children} {icon && icon}
  </Link>
);
