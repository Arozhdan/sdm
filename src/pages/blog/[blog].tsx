import { type NextPage, type GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import { getBlogBySlug } from "~/api/Blog";
import { Typography } from "~/components";
import Meta from "~/components/Meta";
import { getDictionary } from "~/lang";
import { type Media } from "~/models";
import { type Blog } from "~/models/api/Blog";
import { type ValueType } from "~/types";

const RichTextComponent = (text?: string) => {
  if (!text) return null;
  return (
    <div className="flex flex-col items-center">
      <ReactMarkdown className="prose prose-slate lg:prose-lg">
        {text}
      </ReactMarkdown>
    </div>
  );
};
const ImageComponent = (image?: Media) => {
  if (!image) return null;
  return (
    <div className="flex justify-center">
      <Image
        src={process.env.NEXT_PUBLIC_API_URL! + image.url}
        className="w-full max-w-6xl object-cover"
        width={image.width || 450}
        height={image.height || 450}
        alt={image.alternativeText || image.name}
      />
    </div>
  );
};

const BlogPage: NextPage<BlogProps> = ({ blog, dictionary }) => {
  return (
    <>
      <Meta seo={blog.attributes.seo} />
      <header className="container mx-auto w-full max-w-6xl py-20 text-white">
        <div className="items-center lg:flex">
          <Image
            src={
              process.env.NEXT_PUBLIC_API_URL! +
              blog.attributes?.image?.data?.attributes?.url
            }
            className="lg:md-0 mb-10 w-full object-cover lg:w-1/3"
            width={450}
            height={450}
            alt={""}
          />
          <div className="lg:ml-10">
            <Typography variant="big" className="mb-10 text-accent">
              {blog.attributes.title}
            </Typography>
            <Typography variant="body2">
              {blog.attributes.description}
            </Typography>
          </div>
        </div>
      </header>
      {blog.attributes.layout?.length && (
        <div className="mx-auto mb-40 w-full max-w-6xl bg-gray-100/80 py-20">
          {blog.attributes.layout.map((item, index) => (
            <div key={item.id.toString() + item.__component} className="mb-14">
              {item.__component === "layout.rich-text" &&
                RichTextComponent(item.text)}
              {item.__component === "layout.media" &&
                ImageComponent(item.image?.data.attributes)}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BlogPage;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  const blogSlug = params?.blog || "";
  const blog = await getBlogBySlug(blogSlug.toString(), locale);
  if (!blog) {
    return {
      notFound: true,
    };
  }
  const localeKey = locale === "ru" ? "ru" : "en";
  const dictionary = await getDictionary(localeKey);
  return {
    props: {
      blog,
      dictionary,
    },
  };
};

interface BlogProps {
  blog: Blog;
  dictionary: ValueType<ReturnType<typeof getDictionary>>;
}
