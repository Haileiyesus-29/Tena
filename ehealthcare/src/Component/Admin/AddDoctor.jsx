import { Stack, Typography, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function AddDoctor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [password,setPassword] = useState("")
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(" http://localhost:5000/api/doctors/",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        specialty,
        password,
      })
    })
    const data = await response.json()
    console.log(data);
    if (response.status === 200) {
      alert("Doctor Added Successfully");
      navigate("/hospital");
    }

  }


  return (
    <Stack
      sx={{
        backgroundImage:
          'url("https://media.istockphoto.com/id/1452095934/photo/doctor-in-white-coat-holding-plus-sign-for-positive-healthcare-insurance-symbol-concept.jpg?s=612x612&w=0&k=20&c=Byq5DQ4D2WSubCb2KhHvtTPD4exWiqad7WVfrt2xJbI=")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
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
        <form onSubmit={handleSubmit}>
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
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-email"
              label="Email"
              type="email"
              name="email"
              margin="normal"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-speciality"
              label="Speciality of the Doctor"
              type="string"
              margin="normal"
              variant="outlined"
              name="specialty"
              onChange={(e) => setSpecialty(e.target.value)}
            />
            <TextField
              id="outlined-pasword"
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value )}
            />

            <Button variant="contained" sx={{ m: 4, p: 1.5 }} onClick={handleSubmit}>
              add
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
}

export default AddDoctor;
