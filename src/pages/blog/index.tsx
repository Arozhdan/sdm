import { type GetStaticProps, type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBLogList, getBlogPage } from "~/api/Blog";
import { DefaultHeader, ServiceCard, Typography } from "~/components";
import { BlogPage } from "~/models";
import { type Blog } from "~/models/api/Blog";

const BlogPage: NextPage<BlogPageProps> = ({ page, blogs }) => {
  const data = page?.attributes;

  if (!page) return null;
  return (
    <>
      <DefaultHeader title={data.title} image={data.image?.data?.attributes} />

      <section className="container grid py-20 text-white md:grid-cols-2 lg:grid-cols-3 lg:py-40">
        {blogs.map((blog) => (
          <Link key={blog.id} href={"/blog/" + blog.attributes.slug}>
            <Image
              src={
                "http://146.19.80.223:1337" +
                blog.attributes.image.data.attributes.url
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

export const getStaticProps: GetStaticProps = async () => {
  const page = await getBlogPage();
  const blogs = await getBLogList();

  return {
    props: {
      page,
      blogs,
    },
  };
};

interface BlogPageProps {
  page: BlogPage;
  blogs: Blog[];
}
