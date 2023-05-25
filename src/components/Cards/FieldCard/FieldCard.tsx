import Link from "next/link";
import cn from "classnames";
import { type FC } from "react";
import styles from "./FieldCard.module.css";
import { type FieldCardProps } from "./FieldCard.props";
import { Typography } from "~/components/ui";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

export const FieldCard: FC<FieldCardProps> = ({
  title,
  description,
  icon,
  className = "",
  ...props
}) => {
  const classes = cn(styles.card, className);
  return (
    <Link className={classes} {...props}>
      <Typography as="h3" variant="h3" className="mb-10 uppercase text-primary">
        {title}
      </Typography>
      <Typography as="p" variant="body1">
        {description}
      </Typography>
      <Typography
        as="div"
        variant="body1"
        className={`mt-10 inline-flex items-center border-b border-primary text-primary ${
          styles.link || ""
        }`}
      >
        Попробовать бесплатно <ArrowUpRightIcon className="ml-2 h-4 w-4" />
      </Typography>
      <div className={styles.icon}>{icon}</div>
    </Link>
  );
};
