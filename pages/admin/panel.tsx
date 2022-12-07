import { Box, Stack } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import SideBar from "../../components/adminPanel/SideBar";
import AdminDrawer from "../../components/adminPanel/Drawer";
import type { AppProps } from "next/app";
import Loading from "../../components/global/Loading";

const panel = () => {
  const cookie = getCookie("at", {});
  const router = useRouter();

  return (
    <>
      {/* <SideBar children={undefined} /> */}
      <Stack className="mt-5  ">
        <Box>
          <Stack>
            <Box className=" h-40">
              main lblsagflaudgsdf lsdugfuadsgfgsdf sdgfausdgflusdgf
              lusgvsdugfside
              {/* <Loading /> */}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default panel;
