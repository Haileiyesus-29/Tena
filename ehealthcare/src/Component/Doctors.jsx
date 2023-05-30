import { CardMedia, Stack, Typography, Card, CardContent } from "@mui/material";
import Navbar from "./Navbar";
function Doctors() {
  return (
    <><Navbar />
    <Stack m={7}> 
      
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
            <Typography variant="h5" style={{ color: "#2AA7FF" , fontStyle:'italic'}}>
              15 Year Of Experiance
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              fuga quas voluptatum
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
    </>
  );
}

export default Doctors;
