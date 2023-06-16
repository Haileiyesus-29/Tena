import { React, useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Button,
  TextField,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";
function Register() {
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
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Stack
      sx={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/clean-medical-background_53876-97927.jpg?size=626&ext=jpg&ga=GA1.2.1624204321.1680518598&semt=ais")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "60vh",

          background: "rgba(2,48,126,0.5)",
          margin: "auto",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h3" style={{ color: "white" }} m={"20px"}>
          Register
        </Typography>
        <Stack spacing={3} m={"30px"}>
          <RadioGroup value={value} onChange={handleChange}>
            <Stack direction={"row"}>
              <FormControlLabel
                sx={{ color: "#ffffff" }}
                value="hospital"
                control={<Radio color="primary" />}
                label="As Hospital"
              />
              <FormControlLabel
                sx={{ color: "#ffffff" }}
                value="user"
                control={<Radio color="primary" />}
                label="As User"
              />
            </Stack>
          </RadioGroup>

          {value === "hospital" ? (
            <> 
            <StyledInput
            id="outlined-name"
            label="Name of Hospital"
            type="text"
            name="name"
            margin="normal"
            variant="outlined"
          />
          <StyledInput
            id="outlined-email"
            label="Email"
            type="email"
            name="email"
            margin="normal"
            variant="outlined"
          />
              <StyledInput
                id="outlined-address"
                label="Address"
                type="string"
                margin="normal"
                variant="outlined"
                name="address"
              />
              <StyledInput
                id="outlined-number"
                label="Phone Number"
                type="string"
                margin="normal"
                variant="outlined"
                name="contactNumber"
              />
            </>
          ) : (
            <>
            <StyledInput
            id="outlined-name"
            label="Name"
            type="text"
            name="name"
            margin="normal"
            variant="outlined"
          />
          <StyledInput
            id="outlined-email"
            label="Email"
            type="email"
            name="email"
            margin="normal"
            variant="outlined"
          />
          </>
          )}
          <StyledInput
            id="outlined-password"
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
          />
          <StyledInput
            id="outlined-confirm"
            label="Confirm Password"
            type="password"
            margin="normal"
            variant="outlined"
          />

          <Button variant="contained" sx={{ m: 4, p: 1.5 }}>
            register
          </Button>
          <Typography style={{ color: "azure" }}>
            Do you have an Account?
            <Link to="/login" className="link-footer">
              SignIn
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}

export default Register;
