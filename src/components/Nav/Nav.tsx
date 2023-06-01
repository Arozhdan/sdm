import { Button, Logo } from "../ui";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { MenuIcon } from "./MenuIcon/MenuIcon";
import { useState, type FC } from "react";
import { type NavProps } from "./Nav.props";
import Link from "next/link";
import { LogoAgency } from "../ui/LogoAgency";
import styles from "./Nav.module.css";
import { createPortal } from "react-dom";
import { Menu } from "../Menu/Menu";

export const Nav: FC<NavProps> = ({ variant = "agency", dictionary }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="pb-10 pt-20">
      <div className="container mx-auto flex items-center justify-between">
        <Link className={styles.logoWrapper} href="/">
          {variant === "agency" ? <LogoAgency /> : <Logo />}
        </Link>
        <div className="flex">
          {variant === "agency" ? (
            <>
              <div className="hidden md:block">
                <Button
                  tag={"a"}
                  href={"/#form"}
                  icon={<ArrowUpRightIcon />}
                  className="mr-16 "
                >
                  {dictionary?.general.leave_request}
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button icon={<ArrowUpRightIcon />} className="mr-6">
                Попробовать бесплатно
              </Button>
              <Button icon={<ArrowUpRightIcon />} className="mr-10">
                Регистрация
              </Button>
            </>
          )}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MenuIcon />
          </button>
        </div>
      </div>
      {isMenuOpen &&
        createPortal(
          <Menu
            dictionary={dictionary}
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          />,
          document.getElementById("#app")!
        )}
    </nav>
  );
};
