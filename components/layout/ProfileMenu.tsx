import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlicer";

type props = {
  setAnchorEl: React.FC<HTMLElement | null>;
  anchorEl: null | HTMLElement;
};

export default function ProfileMenu({ anchorEl, setAnchorEl }: props) {
  const router = useRouter();
  const dispatch = useDispatch();
  //   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const clickHandler = (data) => {
    setAnchorEl(null);
    router.push(data);
  };
  const signOut = () => {
    clickHandler("/");
    deleteCookie("ut");
    dispatch(setUser(""));
  };

  return (
    <div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => clickHandler("/dashboard")}>Profile</MenuItem>
        <MenuItem onClick={() => signOut()}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
