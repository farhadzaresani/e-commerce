import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Paper, TextField, Typography } from "@mui/material";
import { Item } from "../LoginSignup/styel";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SignOneType } from "../../pages/LoginSignup/type";
import { getCookie } from "cookies-next";

const CreateAdmin = (props) => {
  const [open, setOpen] = React.useState(false);
  const [adminData, setAdminData] = React.useState<SignOneType>({
    name: "",
    phone: "",
  });
  const cookie = getCookie("at");

  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };
  const handleToggle = () => {
    setOpen(true);
  };

  const adminMutation = useMutation({
    mutationFn: async () => {
      return await axios.post("http://localhost:4313/admin/create", adminData, {
        headers: { auth: `ut ${cookie}` },
      });
    },
    mutationKey: ["New Admin"],
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  React.useEffect(() => {
    if (props.active) handleToggle();
  }, [props.active]);
  // console.log(adminData);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Paper sx={{ p: 5 }}>
          <Typography variant="h6">{title} </Typography>
          <Item>
            <TextField
              type="text"
              label="Name:"
              variant="outlined"
              fullWidth
              onChange={(e) =>
                setAdminData({ ...adminData, name: e.target.value })
              }
              // inputRef={ref}
            />
            <TextField
              type="number"
              label="Phone number:"
              variant="outlined"
              fullWidth
              onChange={(e) =>
                setAdminData({ ...adminData, phone: e.target.value })
              }
            />
            <Button onClick={() => handleClose()}>Cancel</Button>
            <Button onClick={() => adminMutation.mutate()}>Create</Button>
          </Item>
        </Paper>
      </Backdrop>
    </div>
  );
};

export default CreateAdmin;
