import React, { type FC } from "react";
import { Typography } from "../ui";
import Link from "next/link";
import { type ValueType } from "~/types";
import { type getDictionary } from "~/lang";

interface FooterProps {
  dictionary?: ValueType<ReturnType<typeof getDictionary>>;
  bg?: "primary" | "black";
}

export const Footer: FC<FooterProps> = ({ dictionary, bg = "primary" }) => {
  const classes = `bg-${bg} py-20 text-white md:py-40`;
  return (
    <footer className={classes}>
      <div className="container justify-between md:flex">
        <div>
          <Typography as="h3" variant="h2" weight="regular">
            {dictionary?.general.mail_us}
          </Typography>
          <Typography as="div" variant="body1" className="mt-1">
            <a href="mailto:info@sassendigital.com" target="_blank">
              info@sassendigital.com
            </a>
          </Typography>
        </div>
        <div className="mt-10 flex flex-wrap gap-4 md:mt-0 md:gap-10">
          <Link href="/ai">
            <Typography variant="body1" className="uppercase" weight="regular">
              {dictionary?.links.ai}
            </Typography>
          </Link>
          <Link href="/">
            <Typography variant="body1" className="uppercase" weight="regular">
              {dictionary?.links.home}
            </Typography>
          </Link>
          <Link href="/services">
            <Typography variant="body1" className="uppercase" weight="regular">
              {dictionary?.links.services}
            </Typography>
          </Link>
          <Link href="/blog">
            <Typography variant="body1" className="uppercase" weight="regular">
              {dictionary?.links.blog}
            </Typography>
          </Link>
          <Link href="/contacts">
            <Typography variant="body1" className="uppercase" weight="regular">
              {dictionary?.links.contact}
            </Typography>
          </Link>
        </div>
      </div>
      <div className="container mt-10 flex gap-4 md:justify-end">
        <a href="/privacy.pdf" target="_blank">
          <Typography variant="small" className="uppercase" weight="regular">
            {dictionary?.links.privacy}
          </Typography>
        </a>
        <a href="https://admin.sassendigital.com/uploads/Oferta_servis_liczenziya_tarify_chat_bot_98121010be.pdf">
          <Typography variant="small" className="uppercase" weight="regular">
            {dictionary?.links.policy}
          </Typography>
        </a>
      </div>
    </footer>
  );
};
