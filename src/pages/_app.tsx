import { type AppType } from "next/dist/shared/lib/utils";
import localFont from "next/font/local";
import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Footer, Nav } from "~/components";
import { type getDictionary } from "~/lang";
import { type ValueType } from "~/types";
import Head from "next/head";
import Script from "next/script";

const Helvetica = localFont({
  src: "../assets/fonts/Helvetica.ttf",
  variable: "--font-helvetica",
});

const MyApp: AppType<MyAppProps> = ({ Component, pageProps }) => {
  const dictionary = pageProps.dictionary;

  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-ED1283469P" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ED1283469P');
          `}
      </Script>
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
        <Component {...pageProps} dictionary={dictionary} />
        <ToastContainer position="bottom-right" draggable autoClose={10000} />
      </div>
    </>
  );
};

export default MyApp;

interface MyAppProps {
  dictionary: ValueType<ReturnType<typeof getDictionary>>;
}
