import {
  Avatar,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import axios from "axios";
function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);
  async function getHospitals() {
    let res = await axios.get("http://localhost:5000/api/hospitals/");
    if (res.status === 200) {
      setData(res.data);
    }
  }
  useEffect(() => {
    getHospitals();
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Toolbar
    // sx={{
    //   background: `rgba(98,188,252,0.55)`,
    // }}
    >
      {/* Logo goes here */}
      <Typography
        variant="h6"
        sx={{ flexGrow: 1, fontFamily: "sans-serif", fontSize: "1.25rem" }}
        color={"black"}
      >
        E-HealthCare
      </Typography>

      <Typography
        sx={{ flexGrow: 0.25, fontFamily: "sans-serif", fontSize: "1.25rem" }}
      >
        <Link to="/hospital" className="link-headeradmin">
          Home
        </Link>
      </Typography>
      <Typography
        sx={{ flexGrow: 0.25, fontFamily: "sans-serif", fontSize: "1.25rem" }}
        color={"black"}
      >
        <Link to="/listofappointment" className="link-headeradmin">
          Appointments
        </Link>
      </Typography>
      <Typography
        sx={{ flexGrow: 0.25, fontFamily: "sans-serif", fontSize: "1.25rem" }}
        color={"black"}
      >
        <IconButton onClick={handleClick}>
          {/* {data.name[0]} */}
          <Avatar sx={{ background: "#183260", fontSize: "30px" }}>H</Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/* <Popup
            trigger={<MenuItem onClick={handleClose}>Update Profile</MenuItem>}
            modal
            nested
          >
            {(close) => (
              <div className="modal">
                <div className="content">
                <ProfileUpdate close={close} />
                </div>
              </div>
            )}
          </Popup> */}
          <Link to={`/viewprofile/${data.id}`} className="link-nav">
            <MenuItem onClose={handleClose}>View Profile</MenuItem>
          </Link>
          <Link to={`/updateprofile/${data.id}`} className="link-nav">
            <MenuItem onClose={handleClose}>Update Profile</MenuItem>
          </Link>
          <Link to="/login" className="link-nav">
            <MenuItem onClose={handleClose}>Logout</MenuItem>
          </Link>
        </Menu>
      </Typography>
    </Toolbar>
  );
}

export default Navbar;
