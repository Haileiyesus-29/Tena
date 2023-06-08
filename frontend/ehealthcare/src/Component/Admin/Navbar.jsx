import { Avatar, IconButton, Toolbar, Typography,Menu,MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

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
        <Link to="/" className="link-headeradmin">
          Home
        </Link>
      </Typography>

      {/* <Typography
        sx={{ flexGrow: 0.25, fontFamily: "sans-serif", fontSize: "1.25rem" }}
        color={"black"}
      >
        <Link to="/about" className="link-headeradmin">
          About
        </Link>
      </Typography> */}
      <Typography
        sx={{ flexGrow: 0.25, fontFamily: "sans-serif", fontSize: "1.25rem" }}
        color={"black"}
      >
        <Link to="/contactus" className="link-headeradmin">
          Appointments
        </Link>
      </Typography>
      <Typography
        sx={{ flexGrow: 0.25, fontFamily: "sans-serif", fontSize: "1.25rem" }}
        color={"black"}
      >
        <IconButton onClick={handleClick}>
          <Avatar sx={{ background: "#183260", fontSize: "30px" }}>H</Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Update Profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Typography>
    </Toolbar>
  );
}

export default Navbar;
