import {Stack, Typography, TextField, Button } from "@mui/material";
import React from "react";
import { TbEdit } from "react-icons/tb";
function ProfileUpdate(close) {
  return (
    <Stack textAlign={"center"} justifyContent={'center'} alignItems={'center'} m={2}>
          <TbEdit style={{ fontSize: "100px" }} />
          <Typography variant="h4" m={4}>Update your Profile</Typography>
        <Stack
          direction={"row"}
          spacing={5}
          alignItems={"center"}
          justifyContent={"center"}
          marginBottom={5}
        >
          <Stack>
            <TextField
              id="outlined-name"
              label="Name of Hospital"
              type="text"
              name="name"
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Email"
              type="email"
              name="email"
              margin="normal"
              variant="outlined"
            />
          </Stack>
          <Stack>
            <TextField
              id="outlined-name"
              label="Address"
              type="string"
              margin="normal"
              variant="outlined"
              name="address"
            />
            <TextField
              id="outlined-name"
              label="Phone Number"
              type="string"
              margin="normal"
              variant="outlined"
              name="contactNumber"
            />
          </Stack>
        </Stack>
        <Stack direction={'row'} spacing={5} justifyContent={'center'}>
            <Button variant="contained" sx={{pl:"20px",pr:"20px",fontSize:'20px', background:'#FBF8F0',color:'#000000'}}>Cancel</Button>
            <Button variant="contained" sx={{pl:"20px",pr:"20px",fontSize:'20px'}}>Update</Button>
        </Stack>

    </Stack>
  );
}

export default ProfileUpdate;
