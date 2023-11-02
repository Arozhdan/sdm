import { ValueType } from "~/types";
import { Footer } from "./Footer/Footer";
import { Nav } from "./Nav/Nav";
import { getDictionary } from "~/lang";

interface LayoutProps {
  dictionary: ValueType<ReturnType<typeof getDictionary>>;
  children: React.ReactNode;
}

export default function Layout({ children, dictionary }: LayoutProps) {
  return (
    <>
      <Nav variant="agency" dictionary={dictionary} />
      <main>{children}</main>
      <Footer dictionary={dictionary} />
    </>
  );
}
