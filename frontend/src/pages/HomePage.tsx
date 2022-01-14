import Navbar from '../components/Navbar';
import repairLogo1 from '../assets/repairLogo1.jpeg';
import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import Footer from '../components/Footer';
import Testimony from '../components/Testimony';
import ServiceCard from '../components/ServiceCard';
import { useData } from '../utility/DataProvider';
import { Link } from 'react-router-dom';
import ServiceType from '../types/ServiceType';
import { ThemeProvider, useTheme } from '@mui/material/styles';

const HomePage = () => {
  const { state, dispatch } = useData();
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: (t) => t.palette.grey[200],
      }}
    >
      <Navbar />
      <Divider />
      <Box component={Paper}>
        {/* What the site is about */}
        <Typography align="center" gutterBottom variant="h1">
          Welcome to Bittaye repair shop
        </Typography>
      </Box>
      <Divider />

      {/* Logos */}
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}>
          <img src={repairLogo1} alt="Logo" height={500} />
        </Box>
        <Box>
          <Typography align="center" gutterBottom variant="h5">
            We provide vehicle maintenance, online sparepart shopping and technical advices regarding ones vehicle. We
            also provides other services such as a car wash, tire change, roadside assistance, towing, and car
            inspection. Our service is guaranteed and quality oriented.
          </Typography>
          <Link to="/appointment" style={{ flexGrow: 1, textDecoration: 'none' }}>
            <Button variant="contained" sx={{ margin: '0 auto', display: 'flex' }}>
              Make an appointment
            </Button>
          </Link>
        </Box>
      </Box>
      <Divider />

      {/*Services we provide */}
      {/**Meet the technicians */}
      <Box>
        <Typography gutterBottom variant="h4" sx={{ textAlign: 'center' }}>
          Services we provide
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
        {state.services.map((service: ServiceType) => {
          return (
            <Box mb={2} key={service?._id}>
              <ServiceCard service={service} />
            </Box>
          );
        })}
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
        <Footer />
      </Box>
    </Box>
  );
};

export default HomePage;
