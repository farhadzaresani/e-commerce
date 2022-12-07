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

type props = {
  close: React.FC<boolean>;
  active: boolean;
  title: string;
  firstLabel: string;
  secondLabel: string;
  secondType: string;
  sumitHandler: React.FC<void>;
};

const CreateAdmin = ({
  close,
  active,
  title,
  firstLabel,
  secondLabel,
  secondType,
  sumitHandler,
}: props) => {
  // const [open, setOpen] = React.useState(false);
  const [inputData, setInputData] = React.useState({
    first: "",
    second: "",
  });
  console.log(inputData.second);

  // const cookie = getCookie("at");

  const handleClose = () => {
    // setOpen(false);
    close(false);
  };
  // const handleToggle = () => {
  //   setOpen(true);
  // };

  // const adminMutation = useMutation({
  //   mutationFn: async () => {
  //     return await axios.post("http://localhost:4313/admin/create", adminData, {
  //       headers: { auth: `ut ${cookie}` },
  //     });
  //   },
  //   mutationKey: ["New Admin"],
  //   onSuccess: (res) => {
  //     console.log(res);
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //   },
  // });

  // React.useEffect(() => {
  //   if (props.active) handleToggle();
  // }, [props.active]);
  // console.log(adminData);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={active}
      >
        <Paper sx={{ p: 5 }}>
          <Typography variant="h6">{title} </Typography>
          <Item>
            <TextField
              type="text"
              label={`${firstLabel}:`}
              variant="outlined"
              fullWidth
              sx={{ my: 2 }}
              onChange={(e) =>
                setInputData({ ...inputData, first: e.target.value })
              }
            />
            <TextField
              type={secondType}
              label={`${secondLabel}:`}
              variant="outlined"
              fullWidth
              sx={{ my: 3 }}
              onChange={(e) =>
                setInputData({ ...inputData, second: e.target.value })
              }
            />
            <Button onClick={() => handleClose()}>Cancel</Button>
            <Button onClick={() => sumitHandler.mutate(inputData)}>
              Create
            </Button>
          </Item>
        </Paper>
      </Backdrop>
    </div>
  );
};

export default CreateAdmin;
