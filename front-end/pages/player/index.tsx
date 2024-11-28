import Head from "next/head";
import Header from "@components/header";
import PlayerMatchesOverview from "@components/playerPage/playerMatchesOverview";


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
            <div className='d-flex justify-content-center'>
                <h1>My matches:</h1>
                <PlayerMatchesOverview/>
            </div>
        </main>
        </>
    )
}

export default Player;