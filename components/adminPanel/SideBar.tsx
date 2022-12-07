import React, { useState, useEffect } from "react";
import Link from "next/link";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CategoryIcon from "@mui/icons-material/Category";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import CreateAdmin from "./CreateAdmin";
import { useMutation } from "@tanstack/react-query";
import { getCookie, hasCookie } from "cookies-next";
import { getAdminMe } from "../../api/API";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlicer";
import { RootState } from "../../store/store";
import { useRouter } from "next/router";
import ListItems from "./ListItems";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  backgroundColor: "green",
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SideBar({ children }: any) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const cookie = getCookie("at", {});
  const thisUser = useSelector((state: RootState) => state.currentUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleToggleCreateModal = () => {
    setOpenCreateModal(true);
  };
  const getAdminData = useMutation({
    mutationFn: async () => {
      return await getAdminMe(cookie);
    },
    onSuccess: (data) => {
      dispatch(setUser(data?.data));
      // console.log(data);
      return data;
    },
    onError: (err) => {
      console.log(err);
      router.push("/admin/login");
    },
  });

  useEffect(() => {
    if (hasCookie("at", {}) && !thisUser.currentUser._id) {
      getAdminData.mutate();
    }
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", position: "sticky" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <AdminPanelSettingsIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Admins Panel
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <ListItems />
          {/* <Divider />
          <List>
            <ListItem disablePadding onClick={handleToggleCreateModal}>
              <ListItemButton>
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText primary={"Create Admin"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding onClick={handleToggleCreateModal}>
              <ListItemButton>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary={"Create Category"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider /> */}
        </Drawer>
        <Main className="mt-4" open={open}>
          {children}
        </Main>
      </Box>
      {/* <CreateAdmin active={openCreateModal} close={setOpenCreateModal} /> */}
    </>
  );
}
