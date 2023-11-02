import { type NextPage, type GetServerSideProps } from "next";
import React from "react";
import { getContacts } from "~/api/Settings";
import { Typography } from "~/components";
import Layout from "~/components/layout";
import { getDictionary } from "~/lang";
import { type Settings } from "~/models/api/Settings";
import { type ValueType } from "~/types";

const Contacts: NextPage<Props> = ({ data, dictionary }) => {
  const formattedPhone = data?.attributes?.contacts?.phone?.replace(
    /[^0-9]/g,
    ""
  );
  return (
    <Layout dictionary={dictionary}>
      <header className="bg-primary py-10">
        <div className="container text-white">
          <Typography variant="large">{dictionary.links.contact}</Typography>
        </div>
      </header>
      <main className="py-20 text-white">
        <div className="container">
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-2 md:col-span-1">
              <Typography variant="h3" className="mb-3">
                {dictionary.contacts.address}
              </Typography>
              <Typography variant="body2">
                {data?.attributes?.contacts?.address}
              </Typography>
            </div>
            <div className="col-span-2 md:col-span-1">
              <Typography variant="h3" className="mb-3">
                {dictionary.contacts.phone}
              </Typography>
              <Typography variant="body2">
                <a href={"tel: " + formattedPhone}>
                  {data?.attributes?.contacts?.phone}
                </a>
              </Typography>
            </div>
            <div className="col-span-2 md:col-span-1">
              <Typography variant="h3" className="mb-3">
                {dictionary.contacts.email}
              </Typography>
              <Typography variant="body2">
                <a href={"mailto:" + data?.attributes?.contacts.email}>
                  {data?.attributes?.contacts?.email}
                </a>
              </Typography>
            </div>
            <div className="col-span-2 md:col-span-1">
              <Typography variant="h3" className="mb-3">
                {dictionary.contacts.social}
              </Typography>
              <Typography variant="body2">
                <a target="_blank" href={data?.attributes?.contacts?.instagram}>
                  Instagram
                </a>
              </Typography>
              <Typography variant="body2">
                <a target="_blank" href={data?.attributes?.contacts?.telegram}>
                  Telegram
                </a>
              </Typography>
              <Typography variant="body2">
                <a target="_blank" href={data?.attributes?.contacts?.whatsapp}>
                  WhatsApp
                </a>
              </Typography>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Contacts;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const data = await getContacts();
  if (!data?.attributes) return { notFound: true };
  const localeKey = locale === "ru" ? "ru" : "en";
  const dictionary = await getDictionary(localeKey);
  return { props: { data, dictionary } };
};

interface Props {
  data: Settings;
  dictionary: ValueType<ReturnType<typeof getDictionary>>;
}
