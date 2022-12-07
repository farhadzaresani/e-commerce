import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material";
import Link from "next/link";
import { StyledLink } from "./Style";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import Badge from "@mui/material/Badge";
import BadgeList from "../global/Badge";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getAdminMe, getMe, getMyBadge } from "../../api/API";
import { getCookie, hasCookie } from "cookies-next";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/userSlicer";
import { RootState } from "../../store/store";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ProfileMenu from "./ProfileMenu";
import { useRouter } from "next/router";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

export default function Navbar(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const router = useRouter();
  const thisUser = useSelector((state: RootState) => state.currentUser);
  const cookie = getCookie("ut", {});

  console.log(thisUser);
  const dispatch = useDispatch();

  const getMeData = useMutation({
    mutationFn: async () => await getMe(cookie),
    onSuccess: (data) => {
      dispatch(setUser(data.data));
      return data.data;
    },
  });

  // const getAdminData = useMutation({
  //   mutationFn: async () => {
  //     await getAdminMe(adminCookie);
  //   },
  //   onSuccess: (data) => {
  //     dispatch(setUser(data.data));
  //     console.log(data);
  //   },
  //   onError: () => {
  //     router.push("/admin/login");
  //   },
  // });

  useEffect(() => {
    if (hasCookie("ut")) {
      getMeData.mutate();
    }
    // if (hasCookie("at")) {
    //   getAdminData.mutate();
    // }
    // console.log(data);
  }, []);

  const [openBadge, setOpenBadge] = useState<boolean>(false);
  const { data } = useQuery({
    queryFn: () => getMyBadge(cookie),
    queryKey: ["badge"],
  });
  console.log(data?.total);
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <StyledToolbar>
            <Typography variant="h6" component="div">
              E-COM
            </Typography>
            {thisUser.currentUser._id ? (
              <Stack direction={"row"} spacing={2}>
                <Badge
                  sx={{ cursor: "pointer" }}
                  onClick={() => setOpenBadge(true)}
                  color="secondary"
                  badgeContent={data?.total}
                >
                  <BadgeIcon />
                </Badge>
                <BadgeList open={openBadge} setOpen={setOpenBadge} />
                <Link href={"/"}>
                  <HomeIcon />
                </Link>
                <Box>
                  <Avatar
                    sx={{ width: 28, height: 28 }}
                    alt={getMeData.data?.data.name}
                    src="/"
                    onClick={handleOpenMenu}
                  />
                  <ProfileMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                </Box>
              </Stack>
            ) : (
              <StyledLink href={"/LoginSignup"}>Login</StyledLink>
            )}
          </StyledToolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}
