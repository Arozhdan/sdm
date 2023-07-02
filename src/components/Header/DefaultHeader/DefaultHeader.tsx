import Image from "next/image";
import { type FC } from "react";
import { ArrowRightIcon, ArrowDownRightIcon } from "@heroicons/react/24/solid";
import { Typography, Button } from "~/components/ui";
import styles from "./DefaultHeader.module.css";
import { type Media } from "~/models";

interface DefaultHeaderProps {
  title: string;
  button?: {
    label: string;
    url: string;
  };
  image?: Media;
  video?: Media;
}

export const DefaultHeader: FC<DefaultHeaderProps> = ({
  title,
  button,
  image,
  video,
}) => {
  return (
    <header className="relative py-20 lg:min-h-screen">
      <div className="container justify-end lg:flex lg:pb-32">
        <div className="pb-10 md:pb-0 md:pl-10 lg:w-1/2">
          <Typography
            as="h1"
            variant="h1"
            className="mb-16 uppercase text-secondary"
          >
            <ArrowRightIcon className="mr-6 inline w-8 text-accent" />
            <span
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: title }}
            ></span>
          </Typography>
          {button && (
            <Button tag="a" href={button.url} icon={<ArrowDownRightIcon />}>
              {button.label}
            </Button>
          )}
        </div>
        <div className="left-0 top-20 pr-10 md:absolute lg:w-1/2">
          <div
            className="relative pb-[100%]"
            style={{
              backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL! +
                "/uploads/IMG_6891_6ef22fec4d.jpg"
                })`,
              backgroundSize: "cover",
            }}
          >
            {video?.url ? (
              <video
                preload="none"
                className="absolute inset-0 h-full w-full object-cover"
                src={"https://admin.sassendigital.com" + video.url}
                autoPlay
                playsInline
                loop
                muted
              />
            ) : (
              <Image
                className="absolute inset-0 h-full w-full object-cover"
                src={
                  process.env.NEXT_PUBLIC_API_URL! +
                  "/uploads/header_img_3505a573f9.webp"
                }
                width={800}
                height={1200}
                alt="digital"
              />
            )}
          </div>
        </div>
        <div
          className="absolute
		right-0 top-1/2 h-64 w-64 -translate-y-1/2 translate-x-3/4
		transform rounded-full bg-gradient-to-br from-accent/30 
		to-accent shadow-2xl shadow-accent blur-3xl filter"
        />
      </div>
      <h2 className="absolute right-0 top-2/3 text-7xl font-bold uppercase tracking-wider text-secondary/25">
        SMM
      </h2>
      <h3 className="absolute left-1/2 top-2/3 max-w-3xl pb-10 pl-10 pt-24 text-7xl font-bold uppercase tracking-wider text-secondary/25">
        DIGITAL-MARKETING
      </h3>
    </header>
  );
};
