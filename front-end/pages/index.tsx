import Head from 'next/head';
import Header from '@components/header';
import EventOverview from '@components/events/EventOverview';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { GetServerSideProps } from 'next';
import LoginOverview from '@components/home/loginOverview';

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('app.title')}</title>
        <meta name="description" content="Login gegevens" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main>
        <div >
           <LoginOverview/>
        </div>
      </main>
    </>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
};

export default Home;
