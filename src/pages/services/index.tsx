import { type GetStaticProps, type NextPage } from "next";
import { getServices, getServicesPage } from "~/api/Services";
import { DefaultHeader, ServiceCard } from "~/components";
import Meta from "~/components/Meta";
import { getDictionary } from "~/lang";
import { type Services, type ServicesPage } from "~/models";
import { type ValueType } from "~/types";

const ServicePage: NextPage<ServicePageProps> = ({
  page,
  services,
  dictionary,
}) => {
  const data = page?.attributes;

  if (!page) return null;
  return (
    <>
      <Meta seo={data.seo} />
      <DefaultHeader
        title={data.title}
        button={{
          label: data.headerLink.label,
          url: data.headerLink.url,
        }}
      />

      <section className="container grid py-40 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            title={service.attributes.title}
            image={service.attributes.image}
            key={service.id}
            slug={`/services/${service.attributes.slug}`}
            label={dictionary.general.more}
            darkTitle={service.attributes.textColor === "dark"}
          />
        ))}
        <ServiceCard
          slug="/#form"
          scroll={false}
          title={dictionary.home.free_showdown}
          promo
          label={dictionary.general.leave_request}
        />
      </section>
    </>
  );
};

export default ServicePage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { page } = await getServicesPage(locale);
  const { services } = await getServices(locale);
  const localeKey = locale === "ru" ? "ru" : "en";
  const dictionary = await getDictionary(localeKey);

  return {
    props: {
      page: page.data,
      services: services.data,
      dictionary,
    },
  };
};

interface ServicePageProps {
  page: ServicesPage["data"];
  services: Services[];
  dictionary: ValueType<ReturnType<typeof getDictionary>>;
}
