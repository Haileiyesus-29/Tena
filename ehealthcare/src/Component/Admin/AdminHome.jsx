import {
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
// import axios from "axios";
function AdminHome() {
  const [data, setData] = useState([{}]);
  async function getDoctors() {
    const response = await fetch(" http://localhost:5000/api/doctors", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setData(json.data));
    if (response.status === 200) {
      setData(response.data);
    }
  }

  useEffect(() => {
    getDoctors();
  }, []);
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
          {data.map((user, index) => (
            <Card sx={{ maxWidth: 345 }} key={index}>
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
                  {user.name}
                </Typography>
                <Typography variant="h5" style={{ color: "#1B3C74" }}>
                  {user.specialty}
                </Typography>
                <Typography
                  variant="h5"
                  style={{ color: "#2AA7FF", fontStyle: "italic" }}
                >
                  {user.email}
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
          ))}
        </Stack>
      </Stack>
    </>
  );
}

export default AdminHome;
