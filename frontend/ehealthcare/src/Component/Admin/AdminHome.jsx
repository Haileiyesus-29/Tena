import {
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function AdminHome() {
  return (
    <>
      <Navbar />
      <Stack m={5}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "san serif",
            fontSize: "3rem",
            textTransform: "uppercase",
            textAlign: "center",
            color: "#10203D",
          }}
          mb={5}
        >
          Our Doctors / Nurses
        </Typography>
        <Link to="/adddoctor" className="link-header">
          <Button
            variant="contained"
            sx={{ width: "40vh", padding: "15px", fontSize: "1.2rem" }}
          >
            Add New Doctor
          </Button>
        </Link>
        <Stack m={"20px"}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              sx={{ height: 400 }}
              image="https://img.freepik.com/free-photo/portrait-experienced-professional-therapist-with-stethoscope-looking-camera_1098-19305.jpg?size=626&ext=jpg&ga=GA1.1.1624204321.1680518598&semt=ais"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{ fontWeight: "700" }}
              >
                Dr. John Smith
              </Typography>
              <Typography variant="h5" style={{ color: "#1B3C74" }}>
                Cardologist
              </Typography>
              <Typography
                variant="h5"
                style={{ color: "#2AA7FF", fontStyle: "italic" }}
              >
                dr.JohnSmith@gmail.com
              </Typography>
              <Stack m={2} direction="row" spacing={3}>
                <Link to={`/updatedoctor/1`}>
                  <Button variant="contained" color="info">
                    Update
                  </Button>
                </Link>
                <Button variant="contained" color="info">
                  View
                </Button>
                <Button variant="contained" color="error">
                  Delete
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </>
  );
}

export default AdminHome;
