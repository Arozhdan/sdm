import { type NextPage, type GetServerSideProps } from "next";
import React from "react";
import { getContacts } from "~/api/Settings";
import { Typography } from "~/components";
import { type Settings } from "~/models/api/Settings";

const Contacts: NextPage<Props> = ({ data }) => {
  const formattedPhone = data?.attributes?.contacts?.phone?.replace(
    /[^0-9]/g,
    ""
  );
  return (
    <>
      <header className="bg-primary py-10">
        <div className="container text-white">
          <Typography variant="large">Контакты</Typography>
        </div>
      </header>
      <main className="py-20 text-white">
        <div className="container">
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-2 md:col-span-1">
              <Typography variant="h3" className="mb-3">
                Адрес
              </Typography>
              <Typography variant="body2">
                {data?.attributes?.contacts?.address}
              </Typography>
            </div>
            <div className="col-span-2 md:col-span-1">
              <Typography variant="h3" className="mb-3">
                Телефон
              </Typography>
              <Typography variant="body2">
                <a href={"tel: " + formattedPhone}>
                  {data?.attributes?.contacts?.phone}
                </a>
              </Typography>
            </div>
            <div className="col-span-2 md:col-span-1">
              <Typography variant="h3" className="mb-3">
                Email
              </Typography>
              <Typography variant="body2">
                <a href={"mailto:" + data?.attributes?.contacts.email}>
                  {data?.attributes?.contacts?.email}
                </a>
              </Typography>
            </div>
            <div className="col-span-2 md:col-span-1">
              <Typography variant="h3" className="mb-3">
                Социальные сети
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
    </>
  );
};

export default Contacts;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getContacts();
  if (!data?.attributes) return { notFound: true };
  return { props: { data } };
};

interface Props {
  data: Settings;
}
