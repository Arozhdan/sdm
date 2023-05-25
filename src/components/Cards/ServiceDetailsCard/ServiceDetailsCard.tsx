import { type FC } from "react";
import cn from "classnames";
import styles from "./ServiceDetailsCard.module.css";
import { type ServiceDetailsCardProps } from "./ServiceDetailsCard.props";
import Link from "next/link";
import { Typography } from "~/components/ui";

export const ServiceDetailsCard: FC<ServiceDetailsCardProps> = ({
  className,
  title,
  items = [],
  index = 0,
  ...props
}) => {
  const classes = cn(styles.ServiceDetailsCard, className, {});
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
        {items.map((item, index) => (
          <div key={index} className={styles.item}>
            <Typography as="h5" variant="body3">
              {item.title}
            </Typography>
            {item.description && (
              <Typography
                as="p"
                variant="body3"
                className="text-accent"
                style={{ lineHeight: 1.12 }}
              >
                {item.description}
              </Typography>
            )}
          </div>
        ))}
      </div>
    </Link>
  );
};
