import axios from "axios";
import { CookieValueTypes } from "cookies-next";
import { useDispatch } from "react-redux";

export const getMyBadge = async (cookie: CookieValueTypes) => {
  const { data } = await axios.get("http://localhost:4313/cart/", {
    headers: { auth: `ut ${cookie}` },
  });
  console.log(data);
  return data;
};

export const getMe = async (token: CookieValueTypes) => {
  const data = await axios
    .post(
      "http://localhost:4313/user/me",
      {},
      { headers: { auth: `ut ${token}` } }
    )
    .then((res) => {
      return res;
    });
  // console.log("ápi", data.data);
  return data;
};

export const getAdminMe = async (token: CookieValueTypes) => {
  const data = await axios
    .post(
      "http://localhost:4313/admin/me",
      {},
      { headers: { auth: `ut ${token}` } }
    )
    .then((res) => {
      return res;
    });
  // console.log("api test", data);
  return data;
};
