import Header from "@components/header"
import RegisterForm from "@components/register/resgisterForm";
import Head from "next/head";

const Register: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Register</title>
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

export default Register;