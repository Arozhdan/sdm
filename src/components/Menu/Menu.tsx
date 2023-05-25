import { type FC, useEffect } from "react";
import { Button, Logo, Typography } from "../ui";
import styles from "./Menu.module.css";
import { ArrowUpRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Link from "next/link";

interface MenuProps {
  onClose: () => void;
  isOpen?: boolean;
}
export const Menu: FC<MenuProps> = ({ onClose, isOpen }) => {
  const router = useRouter();

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
              Главная
            </Typography>
          </Link>
          <Link href="/services">
            <Typography variant="body1" className="uppercase" weight="regular">
              Сервисы
            </Typography>
          </Link>
          <Link href="/blog">
            <Typography variant="body1" className="uppercase" weight="regular">
              Блог
            </Typography>
          </Link>
          <Link href="/contacts">
            <Typography variant="body1" className="uppercase" weight="regular">
              Контакты
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
            Оставить заявку
          </Button>
        </div>
      </div>
    </aside>
  );
};
