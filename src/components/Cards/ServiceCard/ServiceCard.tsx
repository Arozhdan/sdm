import { type FC } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./ServiceCard.module.css";
import { type ServiceCardProps } from "./ServiceCard.props";
import { Button, Typography } from "~/components/ui";
import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { LogoSassen } from "~/components/ui/LogoSassen";
//https://source.unsplash.com/random?question&size=400x400
export const ServiceCard: FC<ServiceCardProps> = ({
  title,
  className = "",
  promo = false,
  image,
  slug,
  hiddenTitle = false,
  ...rest
}) => {
  const classes = cn(styles.card, className, {
    [styles.promo || ""]: promo,
  });
  const imageRelUrl = image?.data?.attributes?.url;
  const imageUrl = imageRelUrl
    ? `http://146.19.80.223:1337${imageRelUrl}`
    : "https://source.unsplash.com/random?question&size=400x400";
  const imageAlt = image?.data?.attributes?.alternativeText || title;
  return (
    <Link href={`${slug}`} {...rest} className={classes}>
      <div className={styles.imgWrapper}>
        <Image src={imageUrl} fill alt={imageAlt} />
      </div>
      <div className={styles.header}>
        {!promo ? (
          <Typography
            variant="h1"
            as="h3"
            className={cn({
              invisible: hiddenTitle,
            })}
          >
            {title}
          </Typography>
        ) : (
          <LogoSassen />
        )}
      </div>
      <div className={styles.more}>
        {promo && (
          <Typography variant="h1" as="h3">
            {title}
          </Typography>
        )}
        <Button icon={<ArrowUpRightIcon />}>
          {promo ? "Отправить заявку" : "Подробнее"}
        </Button>
      </div>
    </Link>
  );
};
