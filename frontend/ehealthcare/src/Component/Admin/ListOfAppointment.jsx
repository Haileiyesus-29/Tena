import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import Navbar from "./Navbar";

function ListOfAppointment() {
  return (
    <>
      <Navbar />
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
        mt={5}
      >
        List of Appointmnets
      </Typography>
      <TableContainer component={Paper} sx={{ width: "90%", margin: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontSize: "25px", fontWeight: "500", color: "#2AA7FF" }}
              >
                Name Of Doctor
              </TableCell>
              <TableCell
                sx={{ fontSize: "25px", fontWeight: "500", color: "#2AA7FF" }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{ fontSize: "25px", fontWeight: "500", color: "#2AA7FF" }}
              >
                Time
              </TableCell>
              <TableCell
                sx={{ fontSize: "25px", fontWeight: "500", color: "#2AA7FF" }}
              >
                Message
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow component="th" scope="row">
              <TableCell sx={{ fontSize: "20px", color: "#10203D" }}>
                Dr Maria James
              </TableCell>
              <TableCell sx={{ fontSize: "20px", color: "#10203D" }}>
                6/6/2023
              </TableCell>
              <TableCell sx={{ fontSize: "20px", color: "#10203D" }}>
                8:00am
              </TableCell>
              <TableCell sx={{ fontSize: "20px", color: "#10203D" }}>
                It is Urgent
              </TableCell>
              <TableCell>
                <Button variant="outlined">View</Button>
                <Button variant="outlined" color="error">Delete</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ListOfAppointment;
