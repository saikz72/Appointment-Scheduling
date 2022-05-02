import Navbar from '../components/Navbar';
import {
  Box,
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Stack,
  Divider,
  TextField,
  Alert,
} from '@mui/material';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import landingPageHero from '../assets/landing-hero.png';
import paintJob from '../assets/paint job 1.jpg';
import tow from '../assets/towing.png';
import hours from '../assets/openingHours.png';
import wash from '../assets/car-wash.png';
import towing from '../assets/tow-truck.png';
import inspection from '../assets/inspection.png';
import oilChange from '../assets/oil.png';
import roadSide from '../assets/roadsideAssistance.png';
import tyre from '../assets/tire.png';
import repair from '../assets/car-repairService.png';
import Testimonial from 'components/Testimonial';
import { useAuth } from 'utility/AuthProvider';
import { usePersist } from 'utility/PersistenceProvider';
import { useState, useEffect } from 'react';
import { baseURL } from 'utility/constants';

function createData(day: string, time: string) {
  return { day, time };
}

const rows = [
  createData('Monday', '9:00AM - 12:00PM'),
  createData('Tuesday', '9:00AM - 12:00PM'),
  createData('Wednesday', '9:00AM - 12:00PM'),
  createData('Thursday', '9:00AM - 12:00PM'),
  createData('Friday', '9:00AM - 12:00PM'),
  createData('Saturday', '9:00AM - 12:00PM'),
];

const HomePage = () => {
  const persist = usePersist();
  const auth = useAuth();
  const user = auth.user ? auth.user : persist.user;
  const [submitted, setSubmitted] = useState(false);
  const [review, setReview] = useState('');
  const [allReviews, setAllReviews] = useState<any[]>([]);

  const submit = async () => {
    try {
      const response = await fetch(baseURL + `review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: review }),
      });
      if (!response.ok) {
        throw new Error('ddd');
      }
      const json = await response.json();
      console.log(json);
      setSubmitted(true);
    } catch (e) {}
  };

  const fetchTest = async () => {
    const response = await fetch(baseURL + 'review');
    const json = await response.json();
    setAllReviews(json);
  };

  useEffect(() => {
    fetchTest();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#FAFBFF',
      }}
    >
      <Navbar />
      <Grid container rowSpacing={6} columnSpacing={{ xs: 4, sm: 2, md: 4 }}>
        <Grid item xs={4}>
          {/* What the site is about */}
          <Box
            sx={{
              display: 'flex',
              mt: 40,
              mx: 4,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography
              align="center"
              variant="h2"
              mt={4}
              color="#2F2888"
              sx={{ fontWeight: 'bold' }}
              gutterBottom
            >
              Welcome to Geek repair shop
            </Typography>
            <Typography align="center" variant="h6" sx={{ fontWeight: '500' }}>
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
      <Box sx={{ backgroundColor: '#FAFBFF' }}>
        <Grid container rowSpacing={6} columnSpacing={{ xs: 4, sm: 2, md: 4 }}>
          <Grid item xs={6}>
            <img width="100%" height="100%" src={paintJob} alt="Logo" />
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                mx: 10,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography
                align="center"
                variant="h2"
                mt={4}
                color="#2F2888"
                sx={{ fontWeight: 'bold' }}
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
            {user && user.userType === 'Customer' && (
              <Box m={8}>
                <Link
                  to="/appointment"
                  style={{ flexGrow: 1, textDecoration: 'none' }}
                >
                  <Button
                    variant="contained"
                    sx={{ margin: '0 auto', display: 'flex' }}
                  >
                    Make an appointment
                  </Button>
                </Link>
              </Box>
            )}
            {user === undefined && (
              <Box m={8}>
                <Link
                  to="/appointment"
                  style={{ flexGrow: 1, textDecoration: 'none' }}
                >
                  <Button
                    variant="contained"
                    sx={{ margin: '0 auto', display: 'flex' }}
                  >
                    Make an appointment
                  </Button>
                </Link>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>

      {/*Services we provide */}
      <Grid container rowSpacing={6} columnSpacing={{ xs: 4, sm: 2, md: 4 }}>
        <Grid item xs={6}>
          <Box
            sx={{
              display: 'flex',
              mt: 8,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography
              align="center"
              variant="h2"
              mt={4}
              color="#2F2888"
              sx={{ fontWeight: 'bold' }}
              gutterBottom
            >
              Services
            </Typography>
            <Typography
              align="center"
              variant="h6"
              sx={{ fontWeight: '500', mx: 20 }}
            >
              Our ASE Certified mechanics are committed to quality for our
              community of drivers in Montreal,Quebec. We make sure to continue
              providing to-quality services by providing biannual trainings. At
              Prestige, we offer a variety of services:
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                mt: 4,
              }}
            >
              <Box sx={{ flexDirection: 'row', display: 'flex', ml: 10 }}>
                <Stack direction="column">
                  <img width="50%" height="100%" src={wash} alt="Logo" />
                  <Typography> Car Wash</Typography>
                </Stack>
                <Stack direction="column">
                  <img width="50%" height="100%" src={oilChange} alt="Logo" />
                  <Typography> Oil Change</Typography>
                </Stack>
                <Stack direction="column">
                  <img width="50%" height="100%" src={inspection} alt="Logo" />
                  <Typography>Inspection</Typography>
                </Stack>
                <Stack direction="column">
                  <img width="50%" height="100%" src={tyre} alt="Logo" />
                  <Typography> Tyre Change </Typography>
                </Stack>
                <Stack direction="column">
                  <img width="50%" height="100%" src={repair} alt="Logo" />
                  <Typography> Repairs</Typography>
                </Stack>
                <Stack direction="column">
                  <img width="50%" height="100%" src={roadSide} alt="Logo" />
                  <Typography> Roadside </Typography>
                  <Typography> Assistance </Typography>
                </Stack>
                <Stack direction="column">
                  <img width="50%" height="100%" src={towing} alt="Logo" />
                  <Typography>Towing</Typography>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <img width="100%" height="100%" src={tow} alt="Logo" />
        </Grid>
      </Grid>

      {/** Opening hours */}
      <Grid container rowSpacing={6} columnSpacing={{ xs: 4, sm: 2, md: 4 }}>
        <Grid item xs={6}>
          <img width="100%" height="100%" src={hours} alt="Logo" />
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography
              align="center"
              variant="h2"
              mt={4}
              color="#2F2888"
              sx={{ fontWeight: 'bold' }}
              gutterBottom
            >
              Opening Hours
            </Typography>
            <Box minWidth={300} sx={{ alignSelf: 'center' }}>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableBody>
                    {rows.map(row => (
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

      {/**Testimonies */}

      <Box>
        <Typography
          align="center"
          variant="h2"
          mt={4}
          color="#2F2888"
          sx={{ fontWeight: 'bold' }}
          gutterBottom
        >
          Some testimonies from our customers
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {allReviews.map(r => (
          <Testimonial review={r.description} />
        ))}
      </Box>
      {user && user.userType === 'Customer' && (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            flexDirection: 'column',
          }}
        >
          <Typography
            align="center"
            variant="h2"
            mt={4}
            color="#2F2888"
            sx={{ fontWeight: 'bold' }}
            gutterBottom
          >
            Add a Testimony
          </Typography>
          <Box width={600}>
            <TextField
              margin="normal"
              multiline
              minRows={5}
              fullWidth
              value={review}
              onChange={e => setReview(e.target.value as string)}
              name="description"
              label="Please add your testimony here."
              id="description"
            />
          </Box>
          <Button
            onClick={submit}
            sx={{ my: 2 }}
            variant="contained"
            disabled={submitted}
          >
            Submit Testimony
          </Button>
          {submitted && (
            <Alert variant="filled" severity="success">
              Your testimony has been submitted.
            </Alert>
          )}
        </Box>
      )}

      <Divider />
      <Footer />
    </Box>
  );
};

export default HomePage;
