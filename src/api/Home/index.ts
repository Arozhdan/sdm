import agent from "../agent";

interface HomepageResponse {
  data: [
    {
      data: unknown;
    }
  ];
}

const getHome = async () => {
  try {
    const urls = [
      "/home-page?populate=deep",
      "/services?fields[0]=title&fields[1]=slug&populate=image",
      "/faqs",
      "/teams?populate=image",
      "/testimonials?populate=*",
      "/promos",
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
