import Head from "next/head";
import MasonryContainer from "../components/MasonryContainer";
import AddPhotoModal from "../components/AddPhotoModal";
import Navbar from "../components/Navbar";
import { store } from "../redux/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="p-5 lg:px-32 lg:py-10 w-full bg-gray-50 h-full">
        <Head>
          <title>My-Unsplash</title>
          <meta name="description" content="Unsplash styled image gallery" />
        </Head>

        <Navbar />
        <AddPhotoModal isOpen={false} />
        <MasonryContainer />
      </div>
    </Provider>
  );
}
