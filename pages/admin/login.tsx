import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import LoginStepOne from "../../components/LoginSignup/LoginStepOne";
import axios from "axios";
import VerifyNumber from "../../components/LoginSignup/VerifyNumber";
import { MyContainer } from "../../components/LoginSignup/styel";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

const login = () => {
  const [status, setStatus] = useState<number>(0);
  const [phoneNum, setPhoneNum] = useState<string | number>();
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  const loginStepOne = useMutation({
    mutationFn: async (data: any) => {
      setPhoneNum(data.phone);
      console.log(data);
      return await axios.post(
        "http://localhost:4313/admin/login-step-one",
        data
      );
    },
    mutationKey: ["SignUpStepTwo"],
    onSuccess: (data) => {
      console.log(data);

      handleOpen();
    },
  });
  const logInStepTwo = useMutation({
    mutationFn: async (enterCode: string) => {
      return await axios.post("http://localhost:4313/admin/login-step-two", {
        phone: phoneNum,
        code: enterCode,
      });
    },
    mutationKey: ["LogInStepTwo"],
    onSuccess: (data) => {
      console.log(data.data.token);
      setCookie("at", data.data.token, {});
      router.push("/admin/panel");
    },
  });

  return (
    <MyContainer>
      <LoginStepOne loginStepOne={loginStepOne} />
      <VerifyNumber
        open={open}
        handleClose={handleClose}
        phoneNum={phoneNum}
        SignUpStepTwo={logInStepTwo}
      />
    </MyContainer>
  );
};

export default login;
