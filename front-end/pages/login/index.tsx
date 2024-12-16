import Header from "@components/header";
import LoginForm from "@components/login/loginForm";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const Login: React.FC = () => {
    const { t } = useTranslation();
    return(
        <>
        <Head>
        <title>{t("login.titlePage")} </title>
        <meta name="description" content="All Events" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main>
        <div className='d-flex justify-content-center'>
            <LoginForm />
        </div>
      </main>
      </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
};

export default Login;