import { type GetStaticProps, type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBLogList, getBlogPage } from "~/api/Blog";
import { DefaultHeader, Typography } from "~/components";
import Meta from "~/components/Meta";
import { getDictionary } from "~/lang";
import { BlogPage } from "~/models";
import { type Blog } from "~/models/api/Blog";
import { type ValueType } from "~/types";

const BlogPage: NextPage<BlogPageProps> = ({ page, blogs, dictionary }) => {
  const data = page?.attributes;

  if (!page) return null;
  return (
    <>
      <Meta seo={data.seo} />

      <DefaultHeader title={data.title} image={data.image?.data?.attributes} />

      <section className="container grid py-20 text-white md:grid-cols-2 lg:grid-cols-3 lg:py-40">
        {blogs.map((blog) => (
          <Link key={blog.id} href={"/blog/" + blog.attributes.slug}>
            <Image
              src={
                process.env.NEXT_PUBLIC_API_URL! +
                blog.attributes.image?.data.attributes.url
              }
              className="w-full object-cover"
              width={300}
              height={300}
              alt={""}
            />
            <Typography variant="body-big" className="mb-4 mt-3 underline">
              {blog.attributes.title}
            </Typography>
            <Typography variant="body2">
              {blog.attributes.description.slice(0, 200) + "..."}
            </Typography>
          </Link>
        ))}
      </section>
    </>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const page = await getBlogPage(locale);
  const blogs = await getBLogList(locale);
  const localeKey = locale === "ru" ? "ru" : "en";
  const dictionary = await getDictionary(localeKey);

  return {
    props: {
      page,
      blogs,
      dictionary,
    },
  };
};

interface BlogPageProps {
  page: BlogPage;
  blogs: Blog[];
  dictionary: ValueType<ReturnType<typeof getDictionary>>;
}
