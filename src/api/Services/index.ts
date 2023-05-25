import { type Service, type ServicesResponse } from "~/models/api/Service";
import agent from "../agent";

interface ServicesPageResponse {
  data: [
    {
      data: unknown;
    }
  ];
}

export const getServicesPage = async () => {
  try {
    const page = await agent.get<ServicesPageResponse>(
      "/services-page?populate=deep"
    );
    return {
      page: page.data,
    };
  } catch (error) {
    throw error;
  }
};

export const getServices = async () => {
  const services = await agent.get<ServicesResponse>(
    "/services?fields[0]=title&fields[1]=slug&populate=image"
  );
  return {
    services: services.data,
  };
};

export const getServicesList = async () => {
  const services = await agent.get<ServicesResponse>("/services?");
  return services.data;
};

export const getServiceBySlug = async (slug: string) => {
  if (!slug) return null;
  const endPoint = `/services?filters[slug]=${slug}&populate=deep`;
  const service = await agent.get<{ data: Service[] }>(endPoint);

  const response = service.data;

  if (!response || !response.data.length) return null;
  console.log("response.data[0]", response.data[0]);

  return response.data[0];
};
