import Head from "next/head";
import MasonryContainer from "../components/MasonryContainer";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="p-5 lg:px-32 lg:py-10 w-full bg-gray-50 h-full">
      <Head>
        <title>My-Unsplash</title>
        <meta name="description" content="Unsplash styled image gallery" />
      </Head>

      <Navbar />
      <MasonryContainer />
    </div>
  );
}
