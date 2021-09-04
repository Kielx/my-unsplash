import "../styles/globals.css";
import "@fontsource/noto-sans";
import { firebase } from "../firebase/firebase";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
