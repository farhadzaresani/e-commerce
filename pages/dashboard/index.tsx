import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CookieValueTypes, getCookie } from "cookies-next";
import React, { useEffect } from "react";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/userSlicer";
import { RootState } from "../../store/store";
import ProfileHero from "../../components/profile/ProfileHero";
import { useState } from "react";
import AlertModal from "../../components/global/AlertModal";
import { getMe } from "../../api/API";

const index = () => {
  const [openAlert, setOpenAlert] = useState({ isopen: false, severity: "" });
  // console.log(openAlert);
  const cookie = getCookie("ut", {});
  const dispatch = useDispatch();
  const thisUser = useSelector((state: RootState) => state.currentUser);
  console.log(thisUser);
  const getMeData = useMutation({
    mutationFn: async (token: CookieValueTypes) => getMe(token),
    onSuccess: (data) => {
      dispatch(setUser(data.data));
      return data.data;
    },
  });

  // useEffect(() => {
  //   getMe(cookie);
  //   console.log(getMe);
  // }, []);

  const editMyName = useMutation({
    mutationFn: async (data) => {
      return await axios.post(
        "http://localhost:4313/user/edit",
        { name: data },
        {
          headers: { auth: `ut ${cookie}` },
        }
      );
    },
    onSuccess: (res) => {
      // console.log(res);
      getMeData.mutate(cookie);
      setOpenAlert({ isopen: true, severity: "success" });
    },
  });

  // console.log(getMeData.data?.data);

  if (!thisUser.currentUser.name) {
    return <HourglassBottomIcon className="animate-spin" />;
  }
  // console.log(getMeData.data?.data.name);
  return (
    <div className=" w-screen">
      <ProfileHero name={thisUser.currentUser.name} editMyName={editMyName} />
      <AlertModal
        open={openAlert}
        setOpen={() => setOpenAlert({ ...openAlert, isopen: false })}
      />
    </div>
  );
};

export default index;
