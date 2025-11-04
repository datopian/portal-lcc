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
import { useEffect } from "react";
import { useRouter } from "next/router";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans"
});

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID ?? '';

const handleRouteChange = (url: string) => {
  (window as any).gtag?.("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

function MyApp({ Component, pageProps }: AppProps) {
  const theme = pageProps.theme || "lighter";
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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
