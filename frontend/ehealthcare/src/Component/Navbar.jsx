import { Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
function Navbar() {

  return (
    <Toolbar
    sx={{
      background: `rgba(98,188,252,0.55)`,
    }}
    >
      {/* Logo goes here */}
      <Typography
        variant="h6"
        sx={{ flexGrow: 1, fontFamily: "sans-serif", fontSize: "1.25rem" }}
        color={'white'}
      >
        E-HealthCare
      </Typography>

      <Typography
        sx={{ flexGrow: 0.25, fontFamily: "sans-serif", fontSize: "1.25rem" }}
        color={"white"}
      >
        <Link to="/" className="link-header">
          Home
        </Link>
      </Typography>

      <Typography
        sx={{ flexGrow: 0.25, fontFamily: "sans-serif", fontSize: "1.25rem" }}
        color={"white"}
      >
        <Link to="/about" className="link-header">
          About
        </Link>
      </Typography>
      <Typography
        sx={{ flexGrow: 0.25, fontFamily: "sans-serif", fontSize: "1.25rem" }}
        color={"white"}
      >
        <Link to="/blog" className="link-header">
          Blog
        </Link>
      </Typography>
      <Typography
        sx={{ flexGrow: 0.25, fontFamily: "sans-serif", fontSize: "1.25rem" }}
        color={"white"}
      >
        <Link to="/contactus" className="link-header">
          Contact
        </Link>
      </Typography>
      <Typography
        sx={{ flexGrow: 0.25, fontFamily: "sans-serif", fontSize: "1.25rem" }}
        color={"white"}
      >
        <Link to="/account" className="link-header">
          Account
        </Link>
      </Typography>
      <Link to="/appointment">
       
        <Button
          variant="contained"
          color="info"
          sx={{
            fontFamily: "sans-serif",
            fontSize: "1.1rem",
            backgroundColor: "#2AA7FF",
          }}
        >
          Make an appointment
        </Button>
      </Link>
    </Toolbar>
  );
}

export default Navbar;
