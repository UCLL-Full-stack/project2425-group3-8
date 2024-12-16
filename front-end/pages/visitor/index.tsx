import Head from "next/head";
import Header from "@components/header";
import VisitorMatchesOverview from "@components/visitor/VisitorMatchesOverview";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Player: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>{t("app.title.visitor")} </title>
                <meta name="description" content="Player" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header />
            <main>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <h1>{t("visitorPage.title")} </h1>
                </div>
                <div>
                    <VisitorMatchesOverview />
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
export default Player;
