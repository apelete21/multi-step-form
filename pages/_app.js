import "@next/font/styles/globals.css";
import { apiKey } from "../service/apiKey";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {/* <!-- Google Maps API --> */}
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
        async
      />
    </>
  );
}
