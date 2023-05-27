import { type GetStaticProps, type NextPage } from "next";
import { getServices, getServicesPage } from "~/api/Services";
import { DefaultHeader, ServiceCard } from "~/components";
import Meta from "~/components/Meta";
import { type Services, type ServicesPage } from "~/models";

const ServicePage: NextPage<ServicePageProps> = ({ page, services }) => {
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
            hiddenTitle
            {...service}
          />
        ))}
        <ServiceCard
          slug="/#form"
          scroll={false}
          title="Запись на бесплатный разбор"
          promo
        />
      </section>
    </>
  );
};

export default ServicePage;

export const getStaticProps: GetStaticProps = async () => {
  const { page } = await getServicesPage();
  const { services } = await getServices();

  return {
    props: {
      page: page.data,
      services: services.data,
    },
  };
};

interface ServicePageProps {
  page: ServicesPage["data"];
  services: Services[];
}
