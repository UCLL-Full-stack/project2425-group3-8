import type { AppProps } from "next/app";
import "@styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default appWithTranslation(App);