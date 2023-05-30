import React from "react";
import {
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Appointment() {
  const [displayText, setDisplayText] = useState(true);
  const handleClick = () => {
    setDisplayText(!displayText);
  };

  return (
    <>
      <Navbar />
      <Stack
        direction={"row"}
        width={"100%"}
        height={"80vh"}
        justifyContent={"space-between"}
        sx={{
          backgroundImage: `url("https://img.freepik.com/free-photo/happy-general-practitioner-talking-senior-man-while-shaking-hands-with-him-during-home-visit_637285-1393.jpg?size=626&ext=jpg&ga=GA1.1.1624204321.1680518598&semt=sph")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          
        }}
      >
        <Stack m={"70px"}>
          <Typography
            variant="h2"
            sx={{
              color: "#02307E",
              fontFamily: "san serif",
              fontSize: "7rem",
              textTransform: "uppercase",
            }}
          >
            Book Your Appointment
          </Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
        <Stack>
          <Stack ml={"15vh"} mt={"50px"} spacing={3} width={"70vh"}>
            <TextField type="text" label="Name" />
            <TextField type="number" label="Phone Number" />
            <TextField type="email" label="Email" />
            <TextField type="date" />
            <Select label="Appointmnet">
              <MenuItem value={"Routine check-up"}>Routine check-up</MenuItem>
              <MenuItem value={"Telemedicine"}>Telemedicine</MenuItem>
              <MenuItem value={"Specialist consultation"}>
                Specialist consultation
              </MenuItem>
              <MenuItem value={"Follow-up visit"}>Follow-up visit</MenuItem>
              <MenuItem value={"Preventive care"}>Preventive care</MenuItem>
            </Select>
            <Select label="Doctors">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Dr Jhon Smith"}>Dr Jhon Smith</MenuItem>
              <MenuItem value={"Dr John Smith"}>Dr Cristina Arun</MenuItem>
              <MenuItem value={"Dr John Smith"}>Dr Mathew Doe</MenuItem>
            </Select>
            <TextareaAutosize
              placeholder="Anything you want to add"
              minRows={5}
            ></TextareaAutosize>
            <Link to="/detail">
              <Button variant="contained" sx={{ m: 4, p: 1.5 }}>
                Schedule Now
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Stack width={"50%"} mb={"40px"}>
          <Stack textAlign={"center"} mb={"20px"}>
            <Typography variant="h3" style={{ color: "#02307E" }}>
              FQA
            </Typography>
            <Typography variant="h5" style={{ color: "#2AA7FF" }}>
              Frequently Asked Questions
            </Typography>
          </Stack>
          <Stack style={{ color: "#02307E" }} spacing={2}>
            <Typography variant="h5">
              How can patients access e-healthcareservices?
              <Button sx={{ fontSize: "27px" }} onClick={handleClick}>
                {displayText ? "+" : "-"}
              </Button>
              {!displayText ? (
                <Typography varaiant="h6">
                  Patients can access e-healthcare services through a variety of
                  channels, including online portals, mobile applications, and
                  video conferencing tools. Many healthcare providers also offer
                  virtual visits and consultations as part of their regular
                  services.
                </Typography>
              ) : (
                ""
              )}
            </Typography>
            <Typography variant="h5">
              How can patients access e-healthcareservices?
              <Button sx={{ fontSize: "27px" }}>+</Button>
            </Typography>
            <Typography variant="h5">
              How can patients access e-healthcareservices?
              <Button sx={{ fontSize: "27px" }}>+</Button>
            </Typography>
            <Typography variant="h5">
              How can patients access e-healthcareservices?
              <Button sx={{ fontSize: "27px" }}>+</Button>
            </Typography>
            <Typography variant="h5">
              How can patients access e-healthcareservices?
              <Button sx={{ fontSize: "27px" }}>+</Button>
            </Typography>
            <Typography variant="h5">
              How can patients access e-healthcareservices?
              <Button sx={{ fontSize: "27px" }}>+</Button>
            </Typography>
            <Typography variant="h5">
              How can patients access e-healthcareservices?
              <Button sx={{ fontSize: "27px" }}>+</Button>
            </Typography>
            <Typography variant="h5">
              How can patients access e-healthcareservices?
              <Button sx={{ fontSize: "27px" }}>+</Button>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default Appointment;
