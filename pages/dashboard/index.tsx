import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect } from "react";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/userSlicer";
import { RootState } from "../../store/store";
import ProfileHero from "../../components/profile/ProfileHero";
import { useState } from "react";
import AlertModal from "../../components/global/AlertModal";

const index = () => {
  const [openAlert, setOpenAlert] = useState({ isopen: false, severity: "" });
  console.log(openAlert);
  const cookie = getCookie("ut", {});
  const dispatch = useDispatch();
  const thisUser = useSelector((state: RootState) => state.currentUser);
  // console.log(thisUser);
  const getMeData = useMutation({
    mutationFn: async () => {
      return await axios.post(
        "http://localhost:4313/user/me",
        {},
        { headers: { auth: `ut ${cookie}` } }
      );
    },
    onSuccess: (data) => {
      dispatch(setUser(data.data));
      return data.data;
    },
  });

  useEffect(() => {
    getMeData.mutate();
    // console.log(data);
  }, []);

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
      console.log(res);
      getMeData.mutate();
      setOpenAlert({ isopen: true, severity: "success" });
    },
  });

  // console.log(getMeData.data?.data);

  if (getMeData.isLoading) {
    return <HourglassBottomIcon className="animate-spin" />;
  }
  console.log(getMeData.data?.data.name);
  return (
    <>
      <ProfileHero name={getMeData.data?.data.name} editMyName={editMyName} />
      <AlertModal
        open={openAlert}
        setOpen={() => setOpenAlert({ ...openAlert, isopen: false })}
      />
    </>
  );
};

export default index;
