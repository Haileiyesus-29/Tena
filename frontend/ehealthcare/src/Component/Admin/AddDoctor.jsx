import { Stack, Typography, Box, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

function AddDoctor() {
  return (
    <Stack>
      <Box
        sx={{
          width: "60vh",
          margin: "auto",
          background: `linear-gradient(to bottom,rgba(98,188,252,0.3), rgba(101,173,129,0.1))`,
          textAlign: "center",
          borderRadius: "10px",
          marginTop: "35px",
        }}
      >
        <Typography variant="h3" style={{ color: "white" }} m={"20px"}>
          Add Doctor
        </Typography>
        <Stack spacing={3} m={"30px"}>
          <TextField
            id="outlined-name"
            label="Name of Doctor"
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
          <TextField
            id="outlined-name"
            label="Speciality of the Doctor"
            type="string"
            margin="normal"
            variant="outlined"
            name="specialty"
          />
          <TextField
            id="outlined-name"
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
          />

          <Button variant="contained" sx={{ m: 4, p: 1.5 }}>
            <Link className="link-header" to='/hospital'> add</Link>
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}

export default AddDoctor;
