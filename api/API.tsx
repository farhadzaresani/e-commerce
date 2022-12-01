import axios from "axios";

export const getCountiesData = async () => {
  const { data } = await axios.get(`${process.env.DOMAIN}/v2/get-meta-data`, {
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_KEY,
      "X-RapidAPI-Host": process.env.RAPID_HOST,
    },
  });
  return data;
};
export const getTopUsers = async () => {
  const { data } = await axios.get(`http://localhost:4000/user/top-users`);
  return data;
};
