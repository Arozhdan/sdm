import { type FC } from "react";
import cn from "classnames";
import styles from "./ServicePricingCard.module.css";
import { type ServicePricingCardProps } from "./ServicePricingCard.props";
import { Button, Typography } from "~/components/ui";

export const ServicePricingCard: FC<ServicePricingCardProps> = ({
  className,
  title,
  discount,
  index = 0,
  ...props
}) => {
  const classes = cn(styles.servicePricingCard, className, {});
  const indexToRender = (index + 1).toString().padStart(2, "0");
  return (
    <a href={props.href} className={classes}>
      <div className={styles.left}>
        <Typography as="span" variant="big" className="hidden md:block">
          {indexToRender}
        </Typography>
        <Typography
          as="h3"
          variant="h2"
          weight="regular"
          className="pb-4 pt-2 md:pb-8 md:pl-16"
        >
          {title}
        </Typography>
      </div>
      <div className={styles.right}>
        <Button size="small">Экономия {discount}%</Button>
      </div>
    </a>
  );
};
