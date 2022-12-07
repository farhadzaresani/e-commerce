import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  width: "100%",

  bgcolor: "background.paper",
};

type props = {
  open: boolean;
  setOpen: React.FC<boolean>;
};

export default function BadgeList({ open, setOpen }: props) {
  //   const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogActions>
          <HighlightOffIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        </DialogActions>
        <DialogTitle id="responsive-dialog-title">
          {"Your badge list"}
        </DialogTitle>
        <DialogContent>
          <List sx={style} component="nav" aria-label="mailbox folders">
            {/* <Typography>Your badge is empty</Typography> */}
            <Divider />
            <ListItem button divider>
              <ListItemText primary="Drafts" />
              <DeleteIcon style={{ color: "red" }} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Trash" />
            </ListItem>
            <Divider light />
            <ListItem button>
              <ListItemText primary="Spam" />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}
