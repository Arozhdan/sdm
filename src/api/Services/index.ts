import { type Service, type ServicesResponse } from "~/models/api/Service";
import agent from "../agent";

interface ServicesPageResponse {
  data: [
    {
      data: unknown;
    }
  ];
}

export const getServicesPage = async (locale?: string) => {
  const localePostfix = locale ? `locale=${locale}` : "";
  try {
    const page = await agent.get<ServicesPageResponse>(
      "/services-page?populate=deep&" + localePostfix
    );
    return {
      page: page.data,
    };
  } catch (error) {
    throw error;
  }
};

export const getServices = async (locale?: string) => {
  const localePostfix = locale ? `locale=${locale}` : "";
  const services = await agent.get<ServicesResponse>(
    "/services?fields[0]=title&fields[1]=textColor&fields[2]=slug&populate=image&" +
      localePostfix
  );
  return {
    services: services.data,
  };
};

export const getServicesList = async (locale?: string) => {
  const localePostfix = locale ? `locale=${locale}` : "";
  const services = await agent.get<ServicesResponse>(
    "/services?" + localePostfix
  );
  return services.data;
};

export const getServiceBySlug = async (slug: string, locale?: string) => {
  if (!slug) return null;
  const localePostfix = locale ? `locale=${locale}` : "";
  const endPoint = `/services?filters[slug]=${slug}&populate=deep&${localePostfix}`;
  const service = await agent.get<{ data: Service[] }>(endPoint);

  const response = service.data;

  if (!response || !response.data.length) return null;
  console.log("response.data[0]", response.data[0]);

  return response.data[0];
};
