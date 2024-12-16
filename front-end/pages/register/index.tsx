import Header from "@components/header"
import RegisterForm from "@components/register/resgisterForm";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const Register: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div>
            <Head>
                <title>{t("register.title")} </title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header />
            <main>
                <div className="d-flex justify-content-center">
                    <RegisterForm />
                </div>
            </main>
        </div>
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

export default Register;