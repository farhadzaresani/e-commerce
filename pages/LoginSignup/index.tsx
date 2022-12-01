import React, { useState } from "react";
import { Container } from "@mui/material";
import SignUpOne from "../../components/LoginSignup/SignUpOne";
import VerifyNumber from "../../components/LoginSignup/VerifyNumber";
import { styled } from "@mui/material";
import { SignOneType } from "./type";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import LoginStepOne from "../../components/LoginSignup/LoginStepOne";
import { MyContainer } from "../../components/LoginSignup/styel";

// const MyContainer = styled(Container)({
//   justifyContent: "center",
//   alignItems: "center",
//   display: "flex",
//   padding: "5",
//   minHeight: "80vh",
// });

const index = () => {
  const router = useRouter();
  const [status, setStatus] = useState<number>(0);

  const [open, setOpen] = useState<boolean>(false);
  const [phoneNum, setPhoneNum] = useState<string | number>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //signup
  const signUpStepOne = useMutation({
    mutationFn: async (data: SignOneType) => {
      setPhoneNum(data.phone);
      return await axios.post("http://localhost:4313/user/sign-up-one", data);
    },
    mutationKey: ["SignUpStepOne"],
    onSuccess: (data) => {
      console.log(data);
      handleOpen();
    },
  });
  const signUpStepTwo = useMutation({
    mutationFn: async (enterCode: string) => {
      return await axios.post("http://localhost:4313/user/sign-up-two", {
        phone: phoneNum,
        code: enterCode,
      });
    },
    mutationKey: ["SignUpStepTwo"],
    onSuccess: (data) => {
      console.log(data.data.token);
      setCookie("ut", data.data.token, {});
      router.push("/dashboard");
    },
  });

  //login
  const loginStepOne = useMutation({
    mutationFn: async (data: any) => {
      setPhoneNum(data.phone);
      console.log(data);
      return await axios.post("http://localhost:4313/user/login-one", data);
    },
    mutationKey: ["SignUpStepTwo"],
    onSuccess: (data) => {
      console.log(data);
      setCookie("ut", data.data.token, {});
      handleOpen();
    },
  });
  const logInStepTwo = useMutation({
    mutationFn: async (enterCode: string) => {
      return await axios.post("http://localhost:4313/user/login-two", {
        phone: phoneNum,
        code: enterCode,
      });
    },
    mutationKey: ["LogInStepTwo"],
    onSuccess: (data) => {
      console.log(data.data.token);
      setCookie("ut", data.data.token, {});
      router.push("/dashboard");
    },
  });

  return (
    <MyContainer maxWidth="md">
      {status == 0 ? (
        <>
          <SignUpOne
            changeStatus={() => setStatus(1)}
            signUpOne={signUpStepOne}
          />
          <VerifyNumber
            open={open}
            handleClose={handleClose}
            phoneNum={phoneNum}
            SignUpStepTwo={signUpStepTwo}
          />
        </>
      ) : (
        <>
          <LoginStepOne
            changeStatus={() => setStatus(0)}
            loginStepOne={loginStepOne}
          />
          <VerifyNumber
            open={open}
            handleClose={handleClose}
            phoneNum={phoneNum}
            SignUpStepTwo={logInStepTwo}
          />
        </>
      )}
    </MyContainer>
  );
};

export default index;
