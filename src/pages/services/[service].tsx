import { ArrowDownLeftIcon, ArrowUpRightIcon } from "@heroicons/react/24/solid";
import {
  type NextPage,
  type GetServerSideProps,
  type GetStaticProps,
  type GetStaticPaths,
} from "next";
import cn from "classnames";
import Head from "next/head";
import Link from "next/link";
import { getServiceBySlug, getServicesList } from "~/api/Services";
import {
  Button,
  FeedbackForm,
  ServiceDetailsCard,
  ServiceHeader,
  Typography,
} from "~/components";
import { type Service } from "~/models/api/Service";
import Meta from "~/components/Meta";
import { getDictionary } from "~/lang";
import { type ValueType } from "~/types";
import { submitForm } from "~/api/Form";

const ServicePage: NextPage<ServiceProps> = ({
  service,
  links,
  dictionary,
}) => {
  const handleSubmit = async (
    name: string,
    phone: string,
    email: string,
    link: string,
    message: string
  ) => {
    await submitForm(
      {
        name,
        phone,
        email,
        link,
        message,
      },
      dictionary
    );
  };
  return (
    <div className="min-h-screen bg-darkGray text-white">
      <Meta seo={service.attributes.seo} />
      <div className="container flex flex-wrap gap-5 gap-x-10 py-10 text-white">
        {links.map((link, index) => (
          <Link
            href={"/services/" + link.attributes.slug}
            key={service.id + index + Math.random()}
          >
            <span dangerouslySetInnerHTML={{ __html: link.attributes.title }} />
          </Link>
        ))}
      </div>
      <ServiceHeader
        title={service.attributes.title}
        subtitle={service.attributes.subtitle}
        subtitle2={service.attributes.subtitle2}
        description={service.attributes.description}
        introItems={service.attributes.introItems}
        headerImage={service.attributes.headerImage}
        whiteHeader={service.attributes.colorTheme === "white"}
        darkHeader={service.attributes.colorTheme === "dark"}
        headerItems={service.attributes.headerItems}
        headerImagePosition={service.attributes.headerImagePosition}
      />
      <section className="container py-32">
        <Typography as="h2" variant="big" className="mb-10">
          {dictionary.services.need}{" "}
          <ArrowDownLeftIcon className="inline w-8" />
        </Typography>
        <div className="mt-20 grid gap-20 sm:grid-cols-2 lg:grid-cols-3">
          {service.attributes.reasons?.map((reason, index) => (
            <div key={reason.id}>
              <div className="mb-8 flex items-center">
                <Typography as="span">{index + 1}</Typography>
                <span className="ml-4 block h-px w-1/2 bg-white"></span>
              </div>
              <Typography as="p" variant="body2">
                {reason.text}
              </Typography>
            </div>
          ))}
        </div>
      </section>
      {service.attributes.content && (
        <section
          className={cn({
            "bg-white py-20 text-darkGray":
              service.attributes.colorTheme === "white",
          })}
        >
          <div className="container">
            <Typography as="h2" variant="big" className="mb-16">
              {service.attributes.content.title}
            </Typography>
            {service.attributes.content.items?.map((item, index) => (
              <ServiceDetailsCard
                href={"#"}
                whiteTheme={service.attributes.colorTheme === "white"}
                className="mb-3"
                index={index}
                title={item.title}
                value={item.value}
                key={index}
              />
            ))}
            <div className="mt-20 flex justify-between">
              {service.attributes.bonuses?.map((bonus, index) => (
                <>
                  <div className="flex items-start" key={bonus.id}>
                    <Typography
                      as="h5"
                      variant="body2"
                      className="mr-16 text-accent"
                    >
                      {dictionary.services.bonus}:
                    </Typography>
                    <Typography as="p" variant="body2">
                      {bonus.title}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    {bonus.pricing?.rub && (
                      <>
                        <Button tag="a" href="#form" size="small">
                          {bonus.pricing?.rub} ₽
                        </Button>
                        /
                        <Button tag="a" href="#form" size="small">
                          {bonus.pricing?.eur} $
                        </Button>
                        <div className="flex h-full flex-col justify-end">
                          мес.
                        </div>
                      </>
                    )}
                  </div>
                </>
              ))}
            </div>
          </div>
        </section>
      )}
      {service.attributes.pricing?.rub && (
        <section className="container justify-between py-10 lg:flex lg:py-20">
          <Typography as="h3" variant="big" className="mb-6 text-white md:mb-0">
            {dictionary.general.pricing}
          </Typography>
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            <Button tag="a" href="#form" size="small">
              {service.attributes.pricing?.rub} ₽
            </Button>
            <span className="hidden md:inline">/</span>
            <Button tag="a" href="#form" size="small">
              {service.attributes.pricing?.eur} €
            </Button>
            <span>{dictionary.general.monthly}</span>
          </div>
        </section>
      )}
      {service.attributes.optional.length > 0 && (
        <section className="container justify-between py-20 md:flex">
          <Typography as="h3" variant="big">
            {dictionary.services.optional}
          </Typography>
          <div className="mt-8 max-w-lg">
            {service.attributes.optional.map((optional) => (
              <Typography
                as="p"
                variant="h3"
                weight="regular"
                className="mb-4"
                key={optional.id}
              >
                <ArrowUpRightIcon className="mr-4 inline w-6" />
                {optional.text}
              </Typography>
            ))}
          </div>
        </section>
      )}
      <div id="form">
        <FeedbackForm dictionary={dictionary} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ServicePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const services = await getServicesList();
  const paths = services.data.reduce((acc: string[], service) => {
    acc.push("/services/" + service.attributes.slug);
    acc.push("/en/services/" + service.attributes.slug);
    return acc;
  }, []);
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const serviceSlug = params?.service || "";
  const localeKey = locale === "ru" ? "ru" : "en";
  const service = await getServiceBySlug(serviceSlug.toString(), localeKey);
  const services = await getServicesList(localeKey);

  console.log("service", service);

  const dictionary = await getDictionary(localeKey);

  return {
    revalidate: 60 * 10,
    props: { service, links: services.data, dictionary },
  };
};

interface ServiceProps {
  service: Service;
  links: Service[];
  dictionary: ValueType<ReturnType<typeof getDictionary>>;
}
