import "@portaljs/components/styles.css";
import "@/styles/globals.scss";
import "@/styles/tabs.scss";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

import SEO from "../next-seo.config";

import Loader from "../components/_shared/Loader";

import ThemeProvider from "../components/theme/theme-provider";

import { Open_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans"
});

function MyApp({ Component, pageProps }: AppProps) {
  const theme = pageProps.theme || "lighter";
  return (
    <div className={cn(openSans.variable, "font-sans")}>
      <ThemeProvider themeName={theme}>
        <DefaultSeo {...SEO} />
        <Loader />
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
