import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export const MyContainer = styled(Container)({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  padding: "5",
  minHeight: "80vh",
});
