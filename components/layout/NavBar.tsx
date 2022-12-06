import * as React from "react";
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
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import BadgeIcon from "@mui/icons-material/Badge";
import Badge from "@mui/material/Badge";

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
  const thisUser = useSelector((state: RootState) => state.currentUser);
  console.log(thisUser);
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
              <Stack direction={"row"} spacing={3}>
                <Badge color="secondary" badgeContent={4}>
                  <BadgeIcon />
                </Badge>
                <PermIdentityIcon />
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
