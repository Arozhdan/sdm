import { type AppType } from "next/dist/shared/lib/utils";
import localFont from "next/font/local";
import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Footer, Nav } from "~/components";
import { useRouter } from "next/router";
import { type getDictionary } from "~/lang";
import { type GetServerSideProps } from "next";
import { type ValueType } from "~/types";
import Head from "next/head";

const Helvetica = localFont({
  src: "../assets/fonts/Helvetica.ttf",
  variable: "--font-helvetica",
});

const MyApp: AppType<MyAppProps> = ({ Component, pageProps }) => {
  const dictionary = pageProps.dictionary;

  return (
    <>
      <Head>
        <meta name="yandex-verification" content="4324fc1ffb0fa7cc" />
        <meta
          name="google-site-verification"
          content="8cN3rYFloingqSgq6AKnchDYYXUgxVTcA-oaA58IBj0"
        />
      </Head>
      <div
        id="#app"
        className={`${Helvetica.variable} min-h-screen bg-darkGray font-sans`}
      >
        <Nav dictionary={dictionary} variant="agency" />
        <Component {...pageProps} />
        <ToastContainer position="bottom-right" draggable autoClose={10000} />
        <Footer dictionary={dictionary} />
      </div>
    </>
  );
};

export default MyApp;

interface MyAppProps {
  dictionary: ValueType<ReturnType<typeof getDictionary>>;
}
