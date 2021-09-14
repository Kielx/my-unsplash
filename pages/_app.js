import "../styles/globals.css";
import "../styles/react-toggle.css";
import "@fontsource/noto-sans";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/500.css";
import { firebase } from "../firebase/firebase";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
