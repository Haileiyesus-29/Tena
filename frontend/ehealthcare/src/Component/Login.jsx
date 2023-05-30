import React from "react";
import { Stack, Box, Typography, Button, TextField } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { InputLabelClasses } from "@mui/material";
// import { inputLabelClasses } from "@material-ui/core/InputLabel";
function Login() {
  //use this with variant="outlined"
  const StyledInput = styled(TextField)`
    width: 100%;
    & .MuiOutlinedInput-notchedOutline {
      border-color: white;
    }
    & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: white;
    }
    .MuiFormLabel-root {
      font-size: 15px !important;
      color: white;
    }
    .MuiOutlinedInput-input {
        font-size: 17px !important;
        color: white;
      }
  `;

  return (
    <Stack
      sx={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/healthcare-background-with-medical-symbols-hexagonal-frame_1017-26363.jpg?size=626&ext=jpg&ga=GA1.2.1624204321.1680518598&semt=sph")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "60vh",
         
          background: "rgba(2,48,126,0.3)",
          margin: "auto",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h3" style={{ color: "white" }} m={"20px"}>
          Login
        </Typography>
        <Stack spacing={3} m={"30px"}>
          <StyledInput
            id="outlined-name"
            label="Email"
            type="email"
            margin="normal"
            variant="outlined"
          />
          <StyledInput
            id="outlined-name"
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
          />
          <Button variant="contained" sx={{ m: 4, p: 1.5 }}>
            Login
          </Button>
          <Typography style={{color:"azure"}}>Don't have an Account? <Link to="/register" className="link-footer">SignUp</Link></Typography>
         
        </Stack>
      </Box>
    </Stack>
  );
}

export default Login;
