import { AppProps } from "next/app";
import Navbar from "../Componenets/NavBar";
import "../globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;