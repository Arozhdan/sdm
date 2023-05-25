import { type FC } from "react";

import cn from "classnames";
import styles from "./ServiceHeader.module.css";
import { Typography } from "~/components/ui";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { type Service } from "~/models/api/Service";

interface ServiceHeaderProps {
  title: Service["attributes"]["title"];
  subtitle: Service["attributes"]["subtitle"];
  description: Service["attributes"]["description"];
  introItems: Service["attributes"]["introItems"];
}

export const ServiceHeader: FC<ServiceHeaderProps> = ({
  title,
  subtitle,
  description,
  introItems,
}) => {
  const classes = cn(styles.serviceHeader);
  return (
    <header className={classes}>
      <div className="container">
        <Typography as="h1" variant="big">
          {title}
        </Typography>
        <div className={styles.subtitle}>
          <div className="flex max-w-4xl items-start">
            {subtitle && (
              <Typography as="p" variant="h1" weight="regular">
                <ArrowRightIcon className="mr-7 inline w-10" />
                {subtitle}
              </Typography>
            )}
          </div>
        </div>
        <Typography as="p" variant="h2" weight="regular">
          {description}
        </Typography>
        <div className={styles.blocks}>
          {introItems.map((item, index) => (
            <div key={item.id}>
              <div className="mb-8 h-px w-32 bg-current" />
              <Typography as="p" variant="body2" weight="regular">
                {item.text}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      <Image
        className={styles.img}
        src="/mockup.png"
        width={660}
        height={715}
        alt=""
      />
    </header>
  );
};
