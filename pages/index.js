import Head from "next/head";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="p-2 lg:px-32 lg:py-10 w-full bg-gray-00 h-full">
      <Head>
        <title>My-Unsplash</title>
        <meta name="description" content="Unsplash styled image gallery" />
      </Head>
      <Navbar />
    </div>
  );
}
