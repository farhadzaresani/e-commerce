import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect } from "react";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

const index = () => {
  const cookie = getCookie("ut", {});
  // console.log(cookie);

  // const testMe = () => {
  //   return axios
  //     .post(
  //       "http://localhost:4313/user/me",
  //       {},
  //       { headers: { auth: `ut ${cookie}` } }
  //     )
  //     .then((res) => {
  //       console.log(res);
  //     });
  // };
  const getMeData = useMutation({
    mutationFn: async () => {
      return await axios.post(
        "http://localhost:4313/user/me",
        {},
        { headers: { auth: `ut ${cookie}` } }
      );
    },
    onSuccess: (data) => {
      return data.data;
    },
  });

  useEffect(() => {
    getMeData.mutate();
    // console.log(data);
  }, []);

  console.log(getMeData.data?.data);

  if (getMeData.isLoading) {
    return <HourglassBottomIcon className="animate-spin" />;
  }

  return <div>welcome to dashboard</div>;
};

export default index;
