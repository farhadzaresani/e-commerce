import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/layout/NavBar";
import SideBar from "../components/adminPanel/SideBar";
import RightBar from "../components/layout/RightBar";
import { Stack } from "@mui/system";
import { Container } from "@mui/material";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const router = useRouter();

  if (router.asPath.includes("login") || router.asPath.includes("Login")) {
    return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Stack direction="row" spacing={2}>
            <Component {...pageProps} />
          </Stack>
        </Hydrate>
      </QueryClientProvider>
    );
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {router.asPath.includes("admin") ? (
            <SideBar children={pageProps.childres}>
              <Component {...pageProps} />
            </SideBar>
          ) : (
            <>
              <NavBar children={pageProps.childres} />
              <Stack direction="row" spacing={2}>
                <Component {...pageProps} />
              </Stack>
            </>
          )}
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
