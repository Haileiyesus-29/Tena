import React, { useEffect, useState } from "react";
import axios from "axios";
import {Box,Typography,Stack,Button,TextField} from '@mui/material'
import { useNavigate } from "react-router-dom";
function UpdateDoctor() {
  const [value, setValue] = useState([{}]);
  const navigate = useNavigate()
  useEffect(()=>{
    getDoctors(id)

  },[])
  const id=1
  async function getDoctors(id) {
    var response = await axios.get("/");
    if (response.status === 200) {
      setValue({ ...response.data });
    }
  }

  async function UpdateDoctor(data, id) {
    const response = await axios.put(`/${id}`, data);
    if(response.status === 200){
        alert('updated')
        navigate('/hospital')
    }
  }


  function handleChange(e) {
    setValue({ ...value, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    alert('updated')
    e.preventDefault();
    UpdateDoctor(value, id);
  }
  return (
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
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-name"
            label="Name of Doctor"
            type="text"
            name="name"
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            value={value.name}
          />
          <TextField
            id="outlined-name"
            label="Email"
            type="email"
            name="email"
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            value={value.email}
          />
          <TextField
            id="outlined-name"
            label="Speciality of the Doctor"
            type="string"
            margin="normal"
            variant="outlined"
            name="specialty"
            onChange={handleChange}
            value={value.specialty}
          />
          <TextField
            id="outlined-name"
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            name="password"
            onChange={handleChange}
            value={value.password}
          />

          <Button variant="contained" sx={{ m: 4, p: 1.5 }}>
              update
           
          </Button>
        </form>
      </Stack>
    </Box>
  );
}

export default UpdateDoctor;
