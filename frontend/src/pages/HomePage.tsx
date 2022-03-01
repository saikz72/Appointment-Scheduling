import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Divider,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Footer from "../components/Footer";
import Testimony from "../components/Testimony";
import ServiceCard from "../components/ServiceCard";
import { Link } from "react-router-dom";
import ServiceType from "../types/ServiceType";
import { useEffect, useState } from "react";
import { getAllServices } from "../services/OfferingService";
import landingPageHero from "../assets/landing-hero.png";
import paintJob from "../assets/paint job 1.jpg";
import tow from "../assets/towing.png";
import hours from "../assets/openingHours.png";

function createData(day: string, time: string) {
  return { day, time };
}

const rows = [
  createData("Monday", "9:00AM - 12:00PM"),
  createData("Tuesday", "9:00AM - 12:00PM"),
  createData("Wednesday", "9:00AM - 12:00PM"),
  createData("Thursday", "9:00AM - 12:00PM"),
  createData("Friday", "9:00AM - 12:00PM"),
  createData("Saturday", "9:00AM - 12:00PM"),
];

const HomePage = () => {
  const [services, setServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    getAllServices().then((result) => {
      setServices(result?.data);
    });
  }, []);
  //sx={{ justifyContent: "center", alignItems: "center" }}

  return (
    <Box
      sx={{
        backgroundColor: "#FAFBFF",
      }}
    >
      <Navbar />
      <Grid container rowSpacing={6} columnSpacing={{ xs: 4, sm: 2, md: 4 }}>
        <Grid item xs={4}>
          {/* What the site is about */}
          <Box
            sx={{
              display: "flex",
              mt: 40,
              mx: 4,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              align="center"
              variant="h2"
              mt={4}
              color="#2F2888"
              sx={{ fontWeight: "bold" }}
              gutterBottom
            >
              Welcome to Geek repair shop.
            </Typography>
            <Typography align="center" variant="h6" sx={{ fontWeight: "500" }}>
              When it comes to your car repair requirement our team offers a
              variety of services that will ensure your vehicle is restored as
              close as possible to manufacturer standards. Handled by certified
              technicians.
            </Typography>
          </Box>
        </Grid>
        {/* Logos */}
        <Grid item xs={8}>
          <img width="100%" height="100%" src={landingPageHero} alt="Logo" />
        </Grid>
      </Grid>

      {/**  */}
      <Box sx={{ backgroundColor: "#FAFBFF" }}>
        <Grid container rowSpacing={6} columnSpacing={{ xs: 4, sm: 2, md: 4 }}>
          <Grid item xs={6}>
            <img width="100%" height="100%" src={paintJob} alt="Logo" />
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                mx: 10,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                align="center"
                variant="h2"
                mt={4}
                color="#2F2888"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                About Us
              </Typography>
              <Typography
                align="center"
                gutterBottom
                variant="h6"
                paragraph
                sx={{ fontWeight: 500 }}
              >
                We provide vehicle maintenance, online sparepart shopping and
                technical advices regarding ones vehicle. We also provides other
                services such as a car wash, tire change, roadside assistance,
                towing, and car inspection. Our service is guaranteed and
                quality oriented.
              </Typography>
            </Box>
            <Box m={8}>
              <Link
                to="/appointment"
                style={{ flexGrow: 1, textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  sx={{ margin: "0 auto", display: "flex" }}
                >
                  Make an appointment
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/*Services we provide */}
      <Grid container rowSpacing={6} columnSpacing={{ xs: 4, sm: 2, md: 4 }}>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              mt: 8,
              mx: 20,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              align="center"
              variant="h2"
              mt={4}
              color="#2F2888"
              sx={{ fontWeight: "bold" }}
              gutterBottom
            >
              Services
            </Typography>
            <Typography align="center" variant="h6" sx={{ fontWeight: "500" }}>
              Our ASE Certified mechanics are committed to quality for our
              community of drivers in Montreal,Quebec. We make sure to continue
              providing to-quality services by providing biannual trainings. At
              Prestige, we offer a variety of services:
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <img width="100%" height="100%" src={tow} alt="Logo" />
        </Grid>
      </Grid>
      <Box m={10}>
        <Box>
          <Typography gutterBottom variant="h4" sx={{ textAlign: "center" }}>
            Services we provide
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {services.map((service: ServiceType) => {
            return (
              <Box mb={2} key={service?._id}>
                <ServiceCard service={service} />
              </Box>
            );
          })}
        </Box>
      </Box>

      {/** Opening hours */}
      <Grid container rowSpacing={6} columnSpacing={{ xs: 4, sm: 2, md: 4 }}>
        <Grid item xs={6}>
          <img width="100%" height="100%" src={hours} alt="Logo" />
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              align="center"
              variant="h2"
              mt={4}
              color="#2F2888"
              sx={{ fontWeight: "bold" }}
              gutterBottom
            >
              Opening Hours
            </Typography>
            <Box minWidth={300} sx={{ alignSelf: "center" }}>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.day}>
                        <TableCell
                          align="center"
                          sx={{ fontWeight: 500, fontSize: 18 }}
                        >
                          {row.day}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 500, fontSize: 18 }}>
                          {row.time}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/**Meet the technicians */}
      <Box>
        <Typography gutterBottom variant="h4" sx={{ textAlign: "center" }}>
          Meet our capable technicians
        </Typography>
        <Typography gutterBottom variant="h4" sx={{ textAlign: "center" }}>
          [TODO]
        </Typography>
      </Box>

      {/**Testimonies */}

      <Box>
        <Typography gutterBottom variant="h4" sx={{ textAlign: "center" }}>
          Some testimonies from our customers
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Testimony
          author="saikou"
          description="I built a Q & A app between students and their teachers to ensure better interaction. Added a sophisticated algorithm that populates the trending/hot topics on top of the question feed"
          date="5th May, 2021"
        />
        <Testimony
          author="saikou"
          description="I built a Q & A app between students and their teachers to ensure better interaction. Added a sophisticated algorithm that populates the trending/hot topics on top of the question feed"
          date="5th May, 2021"
        />
        <Testimony
          author="saikou"
          description="I built a Q & A app between students and their teachers to ensure better interaction. Added a sophisticated algorithm that populates the trending/hot topics on top of the question feed"
          date="5th May, 2021"
        />
        <Testimony
          author="saikou"
          description="I built a Q & A app between students and their teachers to ensure better interaction. Added a sophisticated algorithm that populates the trending/hot topics on top of the question feed"
          date="5th May, 2021"
        />
        <Testimony
          author="saikou"
          description="I built a Q & A app between students and their teachers to ensure better interaction. Added a sophisticated algorithm that populates the trending/hot topics on top of the question feed"
          date="5th May, 2021"
        />
      </Box>

      {/**Footer | social media contact */}
      <Divider />
      <Footer />
    </Box>
  );
};

export default HomePage;
