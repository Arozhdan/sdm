import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { type GetStaticProps, type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { getAi } from "~/api/Ai";
import {
  Button,
  Footer,
  LogoS,
  Menu,
  Testimonials,
  Typography,
} from "~/components";
import { MenuIcon } from "~/components/Nav/MenuIcon/MenuIcon";
import { getDictionary } from "~/lang";
import { type Testimonial } from "~/models/api";
import { type AiResponse } from "~/models/api/aiPage";
import { type ValueType } from "~/types";

const AIPage: NextPage<AIPageProps> = ({ dictionary, data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky left-0 top-0 w-full bg-primary py-10">
        <div className="container mx-auto flex justify-between">
          <Link
            href="/"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary"
          >
            <LogoS className="h-7 w-7" />
          </Link>
          <div className="flex items-center space-x-6">
            <div className="hidden md:block">
              <Button
                tag={"a"}
                href={"https://ai.sassendigital.com"}
                icon={<ArrowUpRightIcon />}
                size="small"
              >
                {dictionary?.general.leave_request}
              </Button>
            </div>

            <div className="hidden md:block">
              <Button
                tag={"a"}
                href={"https://ai.sassendigital.com"}
                icon={<ArrowUpRightIcon />}
                size="small"
              >
                {dictionary?.links.registration}
              </Button>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen &&
        createPortal(
          <Menu
            dictionary={dictionary}
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          />,
          document.getElementById("#app")!
        )}

      <header className="bg-primary pt-20">
        <div className="container mx-auto">
          <div className="justify-between space-y-10 md:flex md:space-y-0">
            <Typography variant="large" className="text-white">
              {data.page.attributes.title1} <br />
              <ArrowRightIcon className="mr-10 inline-block w-10 text-accent" />
              {data.page.attributes.title2}
              <br />
              {data.page.attributes.title3}
            </Typography>
            <div>
              {data.page.attributes.headerItems.map((item) => (
                <div className="flex items-start text-white" key={item.id}>
                  <ArrowUpRightIcon className="mr-2 mt-3 inline-block  w-5" />
                  <Typography variant="body1" className="text-white">
                    {item.text}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
          <Image
            src={
              process.env.NEXT_PUBLIC_API_URL! +
              data.page.attributes.media.data.attributes.url
            }
            alt="AI"
            width={1440}
            height={400}
            className="translate-y-10"
          />
        </div>
      </header>

      <main className="pt-20">
        <section id="Sassen.ai" className="container mx-auto py-20 ">
          <Typography variant="large" className="text-center text-primary">
            Sassen.ai {dictionary.ai.helps}
          </Typography>
          <div className="mx-auto mb-20 mt-16 flex max-w-5xl flex-wrap items-start justify-center gap-3">
            {data.page.attributes.helpsTo.map((item) => (
              <Button key={item.id} outline>
                {item.text}
              </Button>
            ))}
          </div>
        </section>
        <section id="instruments" className="container mx-auto">
          <Typography variant="large" className="text-center text-primary">
            {dictionary.ai.instruments}
          </Typography>
          <div className="mb-32 mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3">
            {data.page.attributes.prompts.data.map((prompt) => (
              <a
                key={prompt.id}
                href="https://ai.sassendigital.com"
                className="group block border border-primary p-6 pb-6 pt-6  transition hover:rounded-lg hover:bg-primary"
              >
                <Typography
                  className="line-clamp-2 h-14 text-primary transition group-hover:text-white"
                  variant="h3"
                >
                  {prompt.attributes.name}
                </Typography>
                <Typography
                  className="mt-5 line-clamp-4 h-24 transition group-hover:text-white"
                  variant="body3"
                >
                  {prompt.attributes.description}
                </Typography>
                <div className="mt-2 inline-flex items-center border-b border-primary text-primary  transition group-hover:text-white">
                  Попробовать бесплатно
                  <ArrowUpRightIcon className="ml-2 w-4 transition group-hover:-rotate-[135deg]" />
                </div>
              </a>
            ))}
            <div className="relative block bg-primary p-10 pb-6 xl:col-span-2">
              <Typography variant="h3" className="uppercase text-white">
                ЧАТ PRO
              </Typography>
              <Typography
                variant="body-big"
                className="relative z-10 mt-10 uppercase text-white"
              >
                Cпроси меня что <br /> угодно
              </Typography>
              <a
                href="https://ai.sassendigital.com"
                className="mt-8 inline-block border-b text-white"
              >
                Попробовать <ArrowLeftIcon className="inline-block w-4" />
              </a>
              <Image
                src="/promo.png"
                alt="AI"
                width={444}
                height={444}
                className="absolute bottom-0 right-0 max-h-full"
              />
            </div>
          </div>
        </section>
        <section id="testimonialsTItle" className="bg-primary pb-10">
          <div className="container relative mx-auto">
            <Image
              src="/22.png"
              alt=""
              width={220}
              height={220}
              className="absolute -top-20"
            />
            <Typography
              variant="body-big"
              className="ml-auto max-w-xl py-20 text-white"
            >
              {data.page.attributes.testimonialsTItle}
            </Typography>
            <Typography variant="large" className="mb-10 text-left text-white">
              {dictionary.ai.people_say}
            </Typography>
            <Testimonials testimonials={data.testimonials} className="" />
          </div>
        </section>
        <section id="how_it_works" className="container mx-auto py-20">
          <Typography
            variant="large"
            className="mt-12 text-center text-primary"
          >
            {dictionary.ai.how_it_works}
          </Typography>
          {data.page.attributes.steps.map((step, i) => (
            <div
              className={clsx(
                "mx-auto w-full max-w-6xl items-center justify-center gap-x-10 py-10 md:flex",
                i % 2 === 0 ? "flex-row-reverse" : "flex-row"
              )}
              key={step.id}
            >
              <div className="md:w-2/5 lg:w-96">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_API_URL! +
                    step.image.data.attributes.url
                  }
                  alt=""
                  width={600}
                  height={600}
                  className="h-full w-full"
                />
              </div>
              <div className="mt-10 md:mt-0 md:w-2/5">
                <Typography variant="body-big" className="text-primary">
                  {step.title}
                </Typography>
                <Typography
                  variant="body3"
                  className="max-w-sm"
                  dangerouslySetInnerHTML={{ __html: step.subtitle || "" }}
                />
              </div>
            </div>
          ))}
        </section>
        <section className="bg-primary pt-32">
          <div className="container mx-auto grid gap-x-12 md:grid-cols-2">
            <div>
              <Typography variant="big" className="max-w-xl text-white">
                {data.page.attributes.footerTitle}
              </Typography>
              <Typography className="mt-10 max-w-lg text-white" variant="body2">
                {data.page.attributes.footerSubtitle}
              </Typography>
              <a
                className="mt-10 inline-block"
                href="https://ai.sassendigital.com"
              >
                <Button size="small">
                  Создать контент <ArrowUpRightIcon className="w-5" />
                </Button>
              </a>
            </div>
            <div className="mt-10 flex flex-col items-end space-y-7 text-white md:mt-0">
              {data.page.attributes.footerItems.map((item) => (
                <div className="border border-white px-3 py-2" key={item.id}>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
          <div className=" relative mx-auto mt-20 overflow-hidden bg-black py-20 pb-20">
            <div
              className="absolute
		right-0 top-0 h-80 w-80 -translate-y-1/2 translate-x-1/2
		transform rounded-full bg-gradient-to-br from-accent/30 
		to-accent/40 shadow-2xl shadow-accent/50 blur-3xl filter"
            />
            <div
              className="bottom-0-0
		absolute left-0 h-80 w-80 -translate-x-1/2 translate-y-1/2
		transform rounded-full bg-gradient-to-br from-accent/30 
		to-accent/40 shadow-2xl shadow-accent/50 blur-3xl filter"
            />
            <span className="absolute right-0 top-1/3 text-7xl font-bold uppercase tracking-wider text-secondary/25">
              SMM
            </span>
            <span className="absolute -bottom-2 -left-1 max-w-3xl text-7xl font-bold uppercase tracking-wider text-secondary/25">
              DIGITAL-MARKETING
            </span>

            <div className="container mx-auto">
              <Typography className="max-w-xl text-white" variant="body-big">
                {data.page.attributes.ctaTtitle}
              </Typography>

              <div className="flex flex-col items-end">
                <div>
                  <Typography
                    as="div"
                    className="my-6 ml-auto max-w-xl text-white"
                    variant="body-big"
                  >
                    {data.page.attributes.ctaSubtitle}
                  </Typography>
                  <a
                    className=" mt-10 inline-block"
                    href="https://ai.sassendigital.com"
                  >
                    <Button size="small">
                      SASSEN MARKETING <ArrowUpRightIcon className="w-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer bg="black" dictionary={dictionary}></Footer>
    </div>
  );
};

export default AIPage;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  // const serviceSlug = params?.service || "";
  const localeKey = locale === "ru" ? "ru" : "en";

  const dictionary = await getDictionary(localeKey);

  const data = await getAi(locale);

  return {
    revalidate: 60 * 10,
    props: { dictionary, data },
  };
};

interface AIPageProps {
  dictionary: ValueType<ReturnType<typeof getDictionary>>;
  data: {
    page: {
      attributes: AiResponse;
    };
    testimonials: Testimonial[];
  };
}
