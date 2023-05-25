import { type FC } from "react";
import cn from "classnames";
import styles from "./Typography.module.css";
import { type TypographyProps } from "./Typography.props";

export const Typography: FC<TypographyProps> = ({
  as = "p",
  weight,
  variant = "body1",
  underline = false,
  align = "left",
  children,
  className,
  ...rest
}) => {
  const Tag = as;
  const classes = cn(
    styles.typography,
    styles[variant],
    styles[align],
    {
      [styles.underlined || ""]: underline,
      [styles[weight || ""] || ""]: weight,
    },
    className
  );

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
};
