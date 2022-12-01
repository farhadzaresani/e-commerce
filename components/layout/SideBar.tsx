import { Box, Stack } from "@mui/material";
import React from "react";
import { styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Skeleton from "@mui/material/Skeleton";
import { getCountiesData } from "../../api/API";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";

// export const getStaticProps: GetStaticProps = async (context) => {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(["data"], getCountiesData);

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

const SideBar = () => {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["data"],
  //   queryFn: getCountiesData,
  // });
  const SerachArea = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "5",
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "100%",
  }));

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  // if (isLoading) {
  //   return (
  //     <Stack
  //       bgcolor="skyblue "
  //       justifyContent="center"
  //       alignItems="center"
  //       spacing={2}
  //       p={2}
  //     >
  //       <Skeleton sx={{ height: 70, width: 200 }} />
  //       <Skeleton sx={{ height: 70, width: 200 }} />
  //     </Stack>
  //   );
  // }

  // const country = Object.keys(data);
  return (
    <Stack
      bgcolor="skyblue "
      justifyContent="center"
      alignItems="center"
      spacing={2}
      p={2}
    >
      <SerachArea>
        <SearchIcon sx={{ color: "action.active", marginTop: 2 }} />
        <TextField id="outlined-basic" label={`Search...`} variant="standard" />
      </SerachArea>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
          sx={{ px: 1, width: "100%", m: 2 }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>11</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SideBar;
