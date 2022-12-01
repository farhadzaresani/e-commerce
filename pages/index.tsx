import { Box } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import HomePage from "../components/Home/HomePage";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage/>
    </>
  );
}
