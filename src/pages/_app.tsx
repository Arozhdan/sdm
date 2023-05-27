import { type AppType } from "next/dist/shared/lib/utils";
import localFont from "next/font/local";
import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Footer, Nav } from "~/components";

const Helvetica = localFont({
  src: "../assets/fonts/Helvetica.ttf",
  variable: "--font-helvetica",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div
      id="#app"
      className={`${Helvetica.variable} min-h-screen bg-darkGray font-sans`}
    >
      <Nav variant="agency" />
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" draggable autoClose={10000} />
      <Footer />
    </div>
  );
};

export default MyApp;
