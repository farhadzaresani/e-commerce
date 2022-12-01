import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler } from "react-hook-form";
import VarifyInput from "./VarifyInput";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const VerifyNumber: React.FC<{
  handleClose: boolean;
  SignUpStepTwo: () => void;
  open: boolean;
  phoneNum: string;
}> = (props) => {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Item sx={style}>
          <Stack
            component="form"
            // onSubmit={handleSubmit(onSubmit)}
            p={4}
            spacing={2}
          >
            <Item>
              <Typography variant="h6" component="h1">
                Verify your number
              </Typography>

              <Typography component="p">{props.phoneNum}</Typography>

              <VarifyInput SignUpStepTwo={props.SignUpStepTwo} />
            </Item>
          </Stack>
        </Item>
      </Modal>
    </div>
  );
};
export default VerifyNumber;
