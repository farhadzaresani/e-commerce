import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { SignOneType } from "../../pages/LoginSignup/type";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Item } from "./styel";
import { useRouter } from "next/router";

const LoginStepOne: React.FC<{ loginStepOne: (data: string) => any }> = (
  props
) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<{ phone: FieldValues }>();

  const router = useRouter();

  const onSubmit: SubmitHandler<{ phone: FieldValues }> = (data) => {
    props.loginStepOne.mutate(data);
  };

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
                Login
              </Typography>
            </Item>

            <TextField
              error={props.msg ? true : false}
              helperText={props.msg}
              id="outlined-basic"
              fullWidth
              label="Phone number:"
              variant="outlined"
              type="number"
              {...register("phone", { required: true })}
            />
            <Item>
              {router.asPath.includes("admin") ? (
                <Button
                  fullWidth
                  className={"bg-blue-500 "}
                  type="submit"
                  disabled={!isDirty || !isValid}
                  variant="contained"
                >
                  Login
                </Button>
              ) : (
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                  fullWidth
                >
                  <Button
                    onClick={props.changeStatus}
                    sx={{ fontSize: { xs: "10px", md: "14px" } }}
                    color="inherit"
                  >
                    Join Us
                  </Button>
                  <Button
                    sx={{ width: "100px" }}
                    className={"bg-blue-500 "}
                    type="submit"
                    disabled={!isDirty || !isValid}
                  >
                    Login
                  </Button>
                </ButtonGroup>
              )}
            </Item>
          </Stack>
        </Item>
      </Paper>
    </>
  );
};
export default LoginStepOne;
