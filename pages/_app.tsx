import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { getCookie, setCookie } from "cookies-next";
import { SessionProvider } from "next-auth/react";
import NextApp from "next/app";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";


import { Notifications } from '@mantine/notifications';
import WebsiteStructure from "../components/WebsiteStructure";


export default function App(props) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState(props.colorScheme);

  const toggleColorScheme = (value) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  const queryClient = new QueryClient();

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <QueryClientProvider client={queryClient}>
              <React.Suspense fallback={<>Loading</>}>
                  <WebsiteStructure>
                    <Component {...pageProps} />
                  </WebsiteStructure>
                  <Notifications />
                </React.Suspense>
              </QueryClientProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </SessionProvider>
    </>
  );
}

App.getInitialProps = async (appContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie("mantine-color-scheme", appContext.ctx) || "dark",
  };
};
