import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { SignOneType } from "../../pages/LoginSignup/type";
import { useForm, SubmitHandler } from "react-hook-form";
import { Item } from "./styel";

const SignUpOne: React.FC<{ signUpOne: SignOneType }> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<SignOneType>();

  const onSubmit: SubmitHandler<SignOneType> = (data) => {
    props.signUpOne.mutate(data);
  };
  console.log(isValid);

  return (
    <>
      <Paper
        variant="outlined"
        sx={{ width: { xs: "95%", sm: "50%" }, margin: "10px" }}
      >
        <Item>
          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            p={4}
            spacing={2}
          >
            <Item>
              <Typography variant="h6" component="h1">
                signup
              </Typography>
            </Item>
            <TextField
              // id="outlined-basic"
              fullWidth
              label="Name:"
              variant="outlined"
              {...register("name", { required: true })}
            />

            <TextField
              id="outlined-basic"
              fullWidth
              label="Phone number:"
              variant="outlined"
              type="number"
              {...register("phone", { required: true })}
            />
            <Item>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
                fullWidth
              >
                <Button
                  sx={{ width: "100px" }}
                  className={"bg-blue-500 "}
                  type="submit"
                  disabled={!isDirty || !isValid}
                >
                  Create
                </Button>
                <Button
                  onClick={props.changeStatus}
                  color="inherit"
                  sx={{ fontSize: { xs: "10px", md: "12px" } }}
                >
                  You already have an account?
                </Button>
              </ButtonGroup>
            </Item>
          </Stack>
        </Item>
      </Paper>
    </>
  );
};
export default SignUpOne;
