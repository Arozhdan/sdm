import { type FC } from "react";

import cn from "classnames";
import styles from "./ServiceHeader.module.css";
import { Typography } from "~/components/ui";
import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { type Service } from "~/models/api/Service";
import ReactMarkdown from "react-markdown";
import { __embeddedInHtml } from "prettier.config.cjs";
import { useNBSP } from "~/hooks";

interface ServiceHeaderProps {
  title: Service["attributes"]["title"];
  subtitle: Service["attributes"]["subtitle"];
  subtitle2: Service["attributes"]["subtitle2"];
  description: Service["attributes"]["description"];
  introItems: Service["attributes"]["introItems"];
  headerImage: Service["attributes"]["headerImage"];
  headerItems?: Service["attributes"]["headerItems"];
  headerImagePosition?: Service["attributes"]["headerImagePosition"];
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
  headerImagePosition = "right",
  headerItems = [],
}) => {
  const classes = cn(
    styles.serviceHeader,
    styles[`header-${headerImagePosition}`],
    {
      [styles.whiteHeader || ""]: whiteHeader,
      [styles.darkHeader || ""]: darkHeader,
    }
  );
  return (
    <header className={classes}>
      <div className="container">
        <Typography
          as="h1"
          variant="big"
          className="mb-10 max-w-3xl  uppercase"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className={styles.subtitle}>
          <div className="grid w-full items-start gap-10 lg:grid-cols-2">
            {subtitle ? (
              <Typography
                as="p"
                variant="h2"
                weight="regular"
                className="max-w-lg"
              >
                <ArrowRightIcon className="mr-7 inline w-10 transform" />
                {subtitle}
              </Typography>
            ) : (
              <div />
            )}
            {subtitle2 && (
              <Typography
                as="p"
                variant="h2"
                weight="regular"
                className="max-w-lg"
              >
                <ArrowRightIcon className="mr-7 inline w-10 transform" />
                {subtitle2}
              </Typography>
            )}
          </div>
        </div>
        <Typography
          as="div"
          variant="h2"
          weight="regular"
          className="relative z-10 max-w-3xl"
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
        <div
          className={cn(
            styles.imgWrapper,
            styles[headerImagePosition || "right"]
          )}
        >
          <div className={cn(styles.img)}>
            <Image
              src={
                process.env.NEXT_PUBLIC_API_URL! +
                headerImage?.data?.attributes?.url
              }
              width={700}
              height={700}
              alt={
                headerImage?.data?.attributes?.alternativeText || "header image"
              }
            />
          </div>
        </div>
      )}
    </header>
  );
};
