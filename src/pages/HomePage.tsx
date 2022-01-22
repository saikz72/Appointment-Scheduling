import Navbar from '../components/Navbar';
import repairLogo1 from '../assets/repairLogo1.jpeg';
import { Box, Button, Divider, Typography } from '@mui/material';
import Footer from '../components/Footer';
import Testimony from '../components/Testimony';
import ServiceCard from '../components/ServiceCard';
import { Link } from 'react-router-dom';
import ServiceType from '../types/ServiceType';
import { useEffect, useState } from 'react';
import { getAllServices } from '../services/OfferingService';

const HomePage = () => {
  const [services, setServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    getAllServices().then((result) => {
      setServices(result?.data);
    });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: (t) => t.palette.grey[200],
      }}
    >
      <Navbar />
      <Box>
        {/* What the site is about */}
        <Typography align="center" variant="h1" mt={4}>
          Welcome to Geek repair shop
        </Typography>
      </Box>
      {/* Logos */}
      <Box mx={25} mt={5} mb={10}>
        <img width="100%" src={repairLogo1} alt="Logo" />
      </Box>

      <Box mb={5} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
        <Box sx={{ maxWidth: 600, alignSelf: 'center' }}>
          <Typography align="center" gutterBottom variant="h4" paragraph>
            We provide vehicle maintenance, online sparepart shopping and technical advices regarding ones vehicle.
            <Typography gutterBottom variant="subtitle1" sx={{ fontSize: 15 }}>
              We also provides other services such as a car wash, tire change, roadside assistance, towing, and car
              inspection. Our service is guaranteed and quality oriented.
            </Typography>
          </Typography>
        </Box>
        <Box m={8}>
          <Link to="/appointment" style={{ flexGrow: 1, textDecoration: 'none' }}>
            <Button variant="outlined" sx={{ margin: '0 auto', display: 'flex' }}>
              Make an appointment
            </Button>
          </Link>
        </Box>
      </Box>
      <Divider />

      {/*Services we provide */}
      {/**Meet the technicians */}
      <Box m={10}>
        <Box>
          <Typography gutterBottom variant="h4" sx={{ textAlign: 'center' }}>
            Services we provide
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
          {services.map((service: ServiceType) => {
            return (
              <Box mb={2} key={service?._id}>
                <ServiceCard service={service} />
              </Box>
            );
          })}
        </Box>
      </Box>

      {/**Meet the technicians */}
      <Box>
        <Typography gutterBottom variant="h4" sx={{ textAlign: 'center' }}>
          Meet our capable technicians
        </Typography>
        <Typography gutterBottom variant="h4" sx={{ textAlign: 'center' }}>
          [TODO]
        </Typography>
      </Box>

      {/**Testimonies */}

      <Box>
        <Typography gutterBottom variant="h4" sx={{ textAlign: 'center' }}>
          Some testimonies from our customers
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
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
      <Box>
        <Divider />
        <Footer />
      </Box>
    </Box>
  );
};

export default HomePage;
