import { type FC, useEffect } from "react";
import { Button, Logo, Typography } from "../ui";
import styles from "./Menu.module.css";
import { ArrowUpRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Link from "next/link";
import { type getDictionary } from "~/lang";
import { type ValueType } from "~/types";

interface MenuProps {
  onClose: () => void;
  isOpen?: boolean;
  dictionary?: ValueType<ReturnType<typeof getDictionary>>;
}
export const Menu: FC<MenuProps> = ({ onClose, isOpen, dictionary }) => {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    });

    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      });
    };
  }, [onClose, isOpen]);

  useEffect(() => {
    const handleRouteChange = () => {
      onClose();
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, onClose]);

  return (
    <aside id="menu" className={styles.menu} onBlur={onClose}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <Logo />
            </div>
            <button onClick={onClose} className={styles.close}>
              <XMarkIcon />
            </button>
          </div>
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
          <Link
            href={{
              pathname: asPath,
            }}
            locale={locale === "ru" ? "en" : "ru"}
          >
            <Typography
              variant="body3"
              className="inline-block bg-white px-4 py-2 uppercase text-primary"
              weight="regular"
            >
              {dictionary?.general.language}
            </Typography>
          </Link>
        </div>
        <div className={styles.bottom}>
          <Button
            tag="a"
            href={"/#form"}
            icon={<ArrowUpRightIcon />}
            className={styles.button}
          >
            {dictionary?.general.leave_request}
          </Button>
        </div>
      </div>
    </aside>
  );
};
