import { type FC } from "react";
import Image from "next/image";
import cn from "classnames";
import styles from "./TestimonialCard.module.css";
import { type TestimonialCardProps } from "./TestimonialCard.props";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Typography } from "~/components/ui";

export const TestimonialCard: FC<TestimonialCardProps> = (props) => {
  const {
    className,
    name,
    quote,
    role,
    avatar,
    quoteFontSize = "body3",
    quoteMaxLines,
    ...rest
  } = props;
  const classes = cn(styles.testimonialCard, className);
  const quoteClasses = cn(styles.quote, {
    [styles.linesMax || ""]: quoteMaxLines,
  });

  return (
    <div className={classes} {...rest}>
      <div className={styles.header}>
        <div className={styles.avatarImg}>
          {avatar ? (
            <Image
              src={"http://146.19.80.223:1337" + avatar}
              alt={name}
              className="object-cover"
              width={64}
              height={64}
            />
          ) : (
            <UserCircleIcon />
          )}
        </div>
        <div className={styles.info}>
          <Typography variant="body2" className={styles.name} weight="bold">
            {name}
          </Typography>
          <Typography
            variant="small"
            className={`${
              styles.role || ""
            } whitespace-pre-wrap capitalize text-gray-600`}
          >
            {role}
          </Typography>
        </div>
      </div>
      <Typography
        variant={quoteFontSize}
        className={quoteClasses}
        style={{
          lineClamp: quoteMaxLines ? quoteMaxLines : "unset",
          WebkitLineClamp: quoteMaxLines ? quoteMaxLines : "unset",
        }}
      >
        {quote}
      </Typography>
    </div>
  );
};
