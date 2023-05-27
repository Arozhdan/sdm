import { ArrowDownLeftIcon, ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { type NextPage, type GetServerSideProps } from "next";
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

const ServicePage: NextPage<ServiceProps> = ({ service, links }) => {
  return (
    <div className="min-h-screen bg-darkGray text-white">
      <Meta seo={service.attributes.seo} />
      <div className="container flex flex-wrap gap-5 gap-x-10 py-10 text-white">
        {links.map((link, index) => (
          <Link
            href={"/services/" + link.attributes.slug}
            key={service.id + index + Math.random()}
          >
            {link.attributes.title}
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
      />
      <section className="container py-32">
        <Typography as="h2" variant="big">
          Вам это необходимо, если <ArrowDownLeftIcon className="inline w-8" />
        </Typography>
        <div className="mt-40 grid gap-20 sm:grid-cols-2 lg:grid-cols-3">
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
                      Бонус:
                    </Typography>
                    <Typography as="p" variant="body2">
                      {bonus.title}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="small">от {bonus.pricing?.rub} ₽</Button>/
                    <Button size="small">{bonus.pricing?.eur} $</Button>
                    <div className="flex h-full flex-col justify-end">мес.</div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </section>
      )}
      {service.attributes.optional.length > 0 && (
        <section className="container justify-between py-32 md:flex">
          <Typography as="h3" variant="big">
            Опционально
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
      <FeedbackForm onSubmit={() => alert("")} />
    </div>
  );
};

export default ServicePage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const serviceSlug = params?.service || "";
  const service = await getServiceBySlug(serviceSlug.toString());
  const services = await getServicesList();

  return {
    props: { service, links: services.data },
  };
};

interface ServiceProps {
  service: Service;
  links: Service[];
}
