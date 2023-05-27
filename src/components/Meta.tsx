import Head from "next/head";
import { type FC } from "react";
import { type Seo } from "~/models/api";

interface MetaProps {
  seo: Seo;
}

const Meta: FC<MetaProps> = ({ seo }) => {
  if (!seo) return null;
  const title = seo.metaTitle + " | " + "Sassen Digital";
  const description = seo.metaDescription;
  const image = seo.metaImage;
  const keywords = seo.keywords;

  const facebook = seo.metaSocial.find(
    (item) => item.socialNetwork === "Facebook"
  );
  const twitter = seo.metaSocial.find(
    (item) => item.socialNetwork === "Twitter"
  );

  const facebookMeta = facebook ? (
    <>
      <meta property="og:title" content={facebook.title} />
      <meta property="og:description" content={facebook.description} />
      <meta property="og:image" content={image.attributes?.url} />
    </>
  ) : (
    <></>
  );

  const twitterMeta = twitter ? (
    <>
      <meta property="twitter:title" content={twitter.title} />
      <meta property="twitter:description" content={twitter.description} />
      <meta property="twitter:image" content={image.attributes?.url} />
    </>
  ) : (
    <></>
  );

  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {image && <meta name="image" content={image.attributes?.url} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {facebookMeta}
      {twitterMeta}
    </Head>
  );
};

export default Meta;
