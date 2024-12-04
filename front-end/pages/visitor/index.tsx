import Head from "next/head";
import Header from "@components/header";

const Player: React.FC = () => {
    return (
        <>
            <Head>
                <title>My matches</title>
                <meta name="description" content="Player" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header />
            <main>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <h1>My registered matches:</h1>
                </div>
            </main>
        </>
    );
};

export default Player;
