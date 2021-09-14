import Head from "next/head";
import MasonryContainer from "../components/MasonryContainer";
import AddPhotoModal from "../components/AddPhotoModal";
import DeletePhotoModal from "../components/DeletePhotoModal";
import Navbar from "../components/Navbar";
import { store } from "../redux/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="transition-all p-5 lg:px-32 lg:py-10 min-w-screen min-h-screen w-full h-full dark:bg-dp02">
        <Head>
          <title>My-Unsplash</title>
          <meta name="description" content="Unsplash styled image gallery" />
        </Head>
        <Navbar />
        <AddPhotoModal />
        <DeletePhotoModal />
        <MasonryContainer />
      </div>
    </Provider>
  );
}
