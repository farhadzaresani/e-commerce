import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

type EditUser = {
  isEdit: boolean;
  newName: string;
};

type props = {
  name: string;
  editMyName: React.FC;
};

const ProfileHero = ({ name, editMyName }: props) => {
  const [editName, setEditName] = useState<EditUser>({
    isEdit: false,
    newName: name,
  });
  console.log(editName);
  const editNameHndler = () => {
    editMyName.mutate(editName.newName);
    setEditName({ ...editName, isEdit: false });
  };

  return (
    <>
      <Container className="  bg-slate-100 ">
        <Box className=" p-5">
          <Stack direction={"row"}>
            {editName.isEdit ? (
              <>
                <TextField
                  className=" text-lg "
                  value={editName.newName}
                  // variant="filled"
                  size="small"
                  inputProps={{ style: { fontSize: 22 } }}
                  onChange={(e) =>
                    setEditName({ ...editName, newName: e.target.value })
                  }
                />
                <Button onClick={() => editNameHndler()} variant="outlined">
                  Save
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h5" component="h1">
                  {name}
                </Typography>
                <Typography
                  variant="h5"
                  component={"button"}
                  onClick={() => setEditName({ ...editName, isEdit: true })}
                >
                  <EditIcon className="text-slate-900/60" />
                </Typography>
              </>
            )}
          </Stack>
          <Stack direction="row" className=" justify-between">
            <Typography
              variant="body1"
              component="h6"
              className="text-slate-900/50"
            >
              +980003334445
            </Typography>
            <Typography
              variant="body1"
              component="h6"
              className="text-slate-900/50"
            >
              join at : 2022-12-05
            </Typography>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default ProfileHero;
