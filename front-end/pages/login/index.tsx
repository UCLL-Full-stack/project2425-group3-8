import Header from "@components/header";
import LoginForm from "@components/login/loginForm";
import Head from "next/head";

const Login: React.FC = () => {
    return(
        <>
        <Head>
        <title>Event Home</title>
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

export default Login;