import Navbar from '../components/Navbar';
import repairLogo1 from '../assets/repairLogo1.jpeg';
import { Box, Container, Divider, Paper, Typography } from '@mui/material';
import Footer from '../components/Footer';
import Testimony from '../components/Testimony';
import ServiceCard from '../components/ServiceCard';

const ServiceDescription = `  Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken,
shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp
to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic,
tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes.
Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.`;

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Divider />
      <Box component={Paper}>
        {/* What the site is about */}
        <Typography align="center" gutterBottom variant="h1">
          Welcome to Bittaye repair shop
        </Typography>
        <Typography align="center" gutterBottom variant="h5">
          We provide vehicle maintenance, online sparepart shopping and technical advices regarding ones vehicle. We
          also provides other services such as a car wash, tire change, roadside assistance, towing, and car inspection.
          Our service is guaranteed and quality oriented.
        </Typography>
      </Box>
      <Divider />

      {/* Logos */}
      <Container>
        <img src={repairLogo1} alt="Logo" />
      </Container>
      <Divider />

      {/*Services we provide */}
      {/**Meet the technicians */}
      <Box>
        <Typography gutterBottom variant="h4" sx={{ textAlign: 'center' }}>
          Services we provide
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
        <ServiceCard serviceName="Car Wash" description={ServiceDescription} />
        <ServiceCard serviceName="Technical Advise" description={ServiceDescription} />
        <ServiceCard serviceName="Spareparts Shop" description={ServiceDescription} />
        <ServiceCard serviceName="Vehicle Repair" description={ServiceDescription} />
        <ServiceCard serviceName="Towing Service" description={ServiceDescription} />
        <ServiceCard serviceName="Towing Service" description={ServiceDescription} />
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
    </div>
  );
};

export default HomePage;
