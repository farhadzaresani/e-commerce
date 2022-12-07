import { getCookie } from "cookies-next";
import React, { useState } from "react";
import { SignOneType } from "../../pages/LoginSignup/type";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import CreateAdmin from "./CreateAdmin";

{
  /* <CreateAdmin active={openCreateModal} close={setOpenCreateModal} />; */
}
const ListItems = () => {
  const [open, setOpen] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [adminData, setAdminData] = useState<SignOneType>({
    name: "",
    phone: "",
  });
  const cookie = getCookie("at");

  //   const handleClose = () => {
  //     setOpen(false);
  //     setOpenCreateModal(false);
  //   };
  const handleToggle = () => {
    setOpenCreateModal(true);
  };

  const adminMutation = useMutation({
    mutationFn: async (data: SignOneType) => {
      return await axios.post(
        "http://localhost:4313/admin/create",
        { name: data.first, phone: data.second },
        {
          headers: { auth: `ut ${cookie}` },
        }
      );
    },
    mutationKey: ["New Admin"],
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <div>
      <Divider />
      <List>
        <ListItem disablePadding onClick={handleToggle}>
          <ListItemButton>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary={"Create Admin"} />
          </ListItemButton>
        </ListItem>
        <CreateAdmin
          active={openCreateModal}
          close={setOpenCreateModal}
          title={"Create Admin"}
          firstLabel={"Name"}
          secondLabel={"Phone Number"}
          secondType={"number"}
          sumitHandler={adminMutation}
        />
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary={"Create Category"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

export default ListItems;
