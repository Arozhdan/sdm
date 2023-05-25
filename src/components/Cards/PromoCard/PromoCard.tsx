import { type FC } from "react";
import cn from "classnames";
import styles from "./PromoCard.module.css";
import { type PromoCardProps } from "./PromoCard.props";
import Link from "next/link";
import { Typography } from "~/components/ui";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export const PromoCard: FC<PromoCardProps> = ({
  title,
  description,
  tag,
  src,
  alt = "",
  className = "",
  ...props
}) => {
  const classes = cn(styles.promoCard, className);
  return (
    <Link {...props} className={classes}>
      <div className="relative mb-14 flex items-start">
        <Typography as="h3" variant="h3">
          {title}
        </Typography>
        {tag && (
          <Typography
            as="span"
            variant="body2"
            className="ml-3 -translate-y-4 transform bg-secondary px-1 text-accent"
          >
            {tag}
          </Typography>
        )}
      </div>
      <Typography as="p" variant="h2" weight="regular" className="w-1/2">
        {description}
      </Typography>
      <Typography
        as="div"
        variant="body1"
        className={`mt-10 inline-flex items-center border-b border-secondary text-secondary ${
          styles.link || ""
        }`}
      >
        Попробовать <ArrowLeftIcon className="ml-2 h-4 w-4" />
      </Typography>
      <Image
        className={styles.image}
        src={src}
        alt={alt}
        width={420}
        height={420}
      />
    </Link>
  );
};
