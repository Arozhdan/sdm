import agent from "../agent";

interface HomepageResponse {
  data: [
    {
      data: unknown;
    }
  ];
}

const getHome = async (locale?: string) => {
  const localePostfix = locale ? `locale=${locale}` : "";
  try {
    const urls = [
      "/home-page?populate=deep&" + localePostfix,
      "/services?fields[0]=title&fields[0]=textColor&fields[1]=slug&populate=image&" +
        localePostfix,
      "/faqs?" + localePostfix,
      "/teams?populate=image&" + localePostfix,
      "/testimonials?populate=*&" + localePostfix,
      "/promos?" + localePostfix,
    ];
    const requests = urls.map((url) => agent.get(url));
    const responses = await Promise.all<{
      data: HomepageResponse;
    }>(requests);

    const data = responses.map((response) => response.data);
    return data;
  } catch (error) {
    throw error;
  }
};

export { getHome };
