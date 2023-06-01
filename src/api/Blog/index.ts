import { type BlogPage } from "~/models";
import agent from "../agent";
import { type Blog } from "~/models/api/Blog";

export const getBlogPage = async (locale?: string) => {
  const localePostfix = locale ? `&locale=${locale}` : "";
  console.log("");
  console.log("");
  console.log("");
  console.log("");

  console.log(`/blog-page?populate=image` + localePostfix);

  const response = await agent.get<{ data: BlogPage }>(
    `/blog-page?populate=image` + localePostfix
  );
  console.log("response.data", response.data);

  return response.data.data;
};

export const getBLogList = async (locale?: string) => {
  const localePostfix = locale ? `&locale=${locale}` : "";
  const response = await agent.get<{ data: Blog }>(
    `/blogs?populate=image${localePostfix}`
  );
  return response.data.data;
};

export const getBlogBySlug = async (slug: string, locale?: string) => {
  const localePostfix = locale ? `&locale=${locale}` : "";
  const response = await agent.get<{ data: Blog[] }>(
    `/blogs?filters[slug]=${slug}&populate=deep${localePostfix}`
  );
  if (response.data?.data?.length === 0) {
    return null;
  }
  return response.data.data[0];
};
