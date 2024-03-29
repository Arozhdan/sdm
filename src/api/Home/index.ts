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
      "/services?fields[0]=title&fields[1]=textColor&fields[2]=slug&populate=image&" +
        localePostfix,
      "/faqs?" + localePostfix,
      "/teams?sort[0]=publishedAt:desc&populate=image&" + localePostfix,
      "/testimonials?populate=*&filters[$or][0][aiRelated][$ne]=true&filters[$or][1][aiRelated][$null]=true&" +
        localePostfix,
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
