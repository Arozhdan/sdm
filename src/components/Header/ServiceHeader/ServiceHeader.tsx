import { type FC } from "react";

import cn from "classnames";
import styles from "./ServiceHeader.module.css";
import { Typography } from "~/components/ui";
import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { type Service } from "~/models/api/Service";
import ReactMarkdown from "react-markdown";
import { __embeddedInHtml } from "prettier.config.cjs";

interface ServiceHeaderProps {
  title: Service["attributes"]["title"];
  subtitle: Service["attributes"]["subtitle"];
  subtitle2: Service["attributes"]["subtitle2"];
  description: Service["attributes"]["description"];
  introItems: Service["attributes"]["introItems"];
  headerImage: Service["attributes"]["headerImage"];
  headerItems?: Service["attributes"]["headerItems"];
  whiteHeader?: boolean;
  darkHeader?: boolean;
}

const RichTextComponent = (text?: string) => {
  if (!text) return null;
  return (
    <div>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

export const ServiceHeader: FC<ServiceHeaderProps> = ({
  title,
  subtitle,
  subtitle2,
  description,
  introItems,
  headerImage,
  whiteHeader,
  darkHeader,
  headerItems = [],
}) => {
  const classes = cn(styles.serviceHeader, {
    [styles.whiteHeader || ""]: whiteHeader,
    [styles.darkHeader || ""]: darkHeader,
  });
  return (
    <header className={classes}>
      <div className="container">
        <Typography as="h1" variant="big" className="mb-20">
          {title}
        </Typography>
        <div className={styles.subtitle}>
          <div className="grid grid-cols-2 items-start justify-end gap-10">
            <Typography as="p" variant="h2" weight="regular">
              {subtitle && (
                <ArrowRightIcon className="mr-7 inline w-10 transform" />
              )}
              {subtitle}
            </Typography>
            <Typography as="p" variant="h2" weight="regular">
              {subtitle2 && (
                <ArrowRightIcon className="mr-7 inline w-10 transform" />
              )}
              {subtitle2}
            </Typography>
          </div>
        </div>
        <Typography
          as="div"
          variant="h2"
          weight="regular"
          className="max-w-3xl"
        >
          {RichTextComponent(description)}
        </Typography>
        {headerItems?.length > 0 && (
          <div className={cn(styles.heroItems)}>
            {headerItems?.map((item) => (
              <div key={item.id}>
                <Typography as="p" variant="body2" weight="regular">
                  <ArrowUpRightIcon className="mr-4 inline w-5" />
                  <span dangerouslySetInnerHTML={{ __html: item.text }} />
                </Typography>
              </div>
            ))}
          </div>
        )}
        <div
          className={cn(styles.blocks, {
            [styles.oneBlock || ""]: introItems.length === 1,
          })}
        >
          {introItems.map((item, index) => (
            <div key={item.id}>
              <div className="mb-8 h-px w-32 bg-current" />
              <Typography as="p" variant="body2" weight="regular">
                <span dangerouslySetInnerHTML={{ __html: item.text }} />
              </Typography>
            </div>
          ))}
        </div>
      </div>
      {headerImage?.data?.attributes?.url && (
        <Image
          className={styles.img}
          src={"http://146.19.80.223:1337" + headerImage?.data?.attributes?.url}
          width={800}
          height={800}
          alt={headerImage?.data?.attributes?.alternativeText || "header image"}
        />
      )}
    </header>
  );
};
