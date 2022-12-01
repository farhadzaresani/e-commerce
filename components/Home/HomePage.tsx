import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { getCountiesData } from "../../api/API";
import CardItem from "./CardItem";
import Grid from "@mui/material/Grid";

const HomePage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <CardItem />
      </Grid>
    </Grid>
  );
};

export default HomePage;
