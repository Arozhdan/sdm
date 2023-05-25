import { type BlogPage } from "~/models";
import agent from "../agent";
import { type Blog } from "~/models/api/Blog";

export const getBlogPage = async () => {
  const response = await agent.get<{ data: BlogPage }>(
    `/blog-page?populate=image`
  );
  return response.data.data;
};

export const getBLogList = async () => {
  const response = await agent.get<{ data: Blog }>(`/blogs?populate=image`);
  return response.data.data;
};

export const getBlogBySlug = async (slug: string) => {
  const response = await agent.get<{ data: Blog[] }>(
    `/blogs?filters[slug]=${slug}&populate=deep`
  );
  if (response.data?.data?.length === 0) {
    return null;
  }
  return response.data.data[0];
};
