import agent from "../agent";

interface AiResponse {
  data: {
    data: unknown;
  };
}

export const getAi = async (locale?: string) => {
  const localePostfix = locale ? `locale=${locale}` : "";
  const testimonialsResponse = await agent.get<AiResponse>(
    `/testimonials?populate=*&${localePostfix}`
  );
  const pageResponse = await agent.get<AiResponse>(
    `/ai-page?populate=deep&${localePostfix}`
  );

  return {
    page: pageResponse.data.data,
    testimonials: testimonialsResponse.data.data,
  };
};
