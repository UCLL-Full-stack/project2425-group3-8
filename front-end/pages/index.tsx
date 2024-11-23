import Head from 'next/head';
import Header from '@components/header';
import EventOverview from '@components/events/EventOverview';


const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Event Home</title>
        <meta name="description" content="All Events" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main>
        <div >
            <EventOverview/>
        </div>
      </main>
    </>
  );
};

export default Home;
