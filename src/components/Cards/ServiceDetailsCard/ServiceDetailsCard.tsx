import { type FC } from "react";
import cn from "classnames";
import styles from "./ServiceDetailsCard.module.css";
import { type ServiceDetailsCardProps } from "./ServiceDetailsCard.props";
import Link from "next/link";
import { Typography } from "~/components/ui";

export const ServiceDetailsCard: FC<ServiceDetailsCardProps> = ({
  className,
  title,
  value,
  index = 0,
  whiteTheme = false,
  ...props
}) => {
  const classes = cn(styles.ServiceDetailsCard, className, {
    [styles.whiteTheme || ""]: whiteTheme,
  });
  const indexToRender = (index + 1).toString().padStart(2, "0");
  return (
    <Link className={classes} {...props}>
      <div className={styles.left}>
        <Typography as="span" variant="big">
          {indexToRender}
        </Typography>
        <Typography
          as="h3"
          variant="h2"
          weight="regular"
          className="pb-8 pl-16 pt-2"
        >
          {title}
        </Typography>
      </div>
      <div className={styles.right}>
        <div className={styles.item}>
          <Typography as="h5" variant="body3">
            {value}
          </Typography>
        </div>
      </div>
    </Link>
  );
};
