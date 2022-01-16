import {
  Box,
  MenuItem,
  TextField,
  Button,
  Typography,
  Card,
  CssBaseline,
  Alert,
  CircularProgress,
} from '@mui/material';
import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../utility/AuthProvider';
// import { LocalizationProvider } from '@mui/lab';
// import DateTimePicker from '@mui/lab/DateTimePicker';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useData } from '../utility/DataProvider';
import ServiceType from '../types/ServiceType';
import AutomobileType from '../types/AutomobileType';
import { getAutomobilesFromServer } from '../services/AutomobileService';
import Footer from '../components/Footer';
import { bookAppointment } from '../services/AppointmentService';
import { blue } from '@mui/material/colors';

export default function BookAppointmentPage() {
  const { user } = useAuth();
  const { state } = useData();
  const [service, setService] = React.useState('');
  const [automobile, setAutomobile] = React.useState('');
  const [automobiles, setAutomobiles] = React.useState<AutomobileType[]>([]);
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [status, setStatus] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setService(event.target.value as string);
  };

  const handleAutomobileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutomobile(event.target.value as string);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //TODO : accept payment to book appointment
    const data = new FormData(event.currentTarget);
    const nameOnCard: string | undefined = data.get('nameOnCard')?.toString();
    const cardNumber: string | undefined = data.get('cardNumber')?.toString();
    const expiryDate: string | undefined = data.get('expiryDate')?.toString();
    const cvv: string | undefined = data.get('cvv')?.toString();

    const customerId: string = user?._id;

    const requestBody: any = {
      serviceId: service,
      customerId: customerId,
      startDate: startDate,
      automobileId: automobile,
    };
    console.log(loading);
    if (!loading) {
      setLoading(true);
      setStatus('');
      try {
        const response = await bookAppointment(requestBody);
        setStatus('book');
        setLoading(false);
      } catch (error) {
        console.log(error);
        setStatus('fail');
        setLoading(false);
      }
    }
  };

  React.useEffect(() => {
    getAutomobilesFromServer(user?._id).then((res: any) => setAutomobiles(res));
  }, [user?._id]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: (t) => t.palette.grey[200],
        }}
      >
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: blue[500],
            }}
          />
        )}
        {status === 'book' ? (
          <Alert variant="filled" severity="success">
            Appointment has been booked successfully!
          </Alert>
        ) : status === 'fail' ? (
          <Alert variant="filled" severity="error">
            Fail to book appointment, something went wrong.
          </Alert>
        ) : null}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: (t) => t.palette.grey[200],
        }}
      >
        {/** START 1*/}
        <Box
          mt={2}
          component={Card}
          sx={{
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            width: 500,
          }}
        >
          {/** START 2*/}
          <Box mt={4} mb={4}>
            <TextField
              id="outlined-select-currency"
              select
              label="Service"
              value={service}
              onChange={handleServiceChange}
              helperText="Please select a service"
              sx={{ mx: 2 }}
            >
              {state.services.map((service: ServiceType) => (
                <MenuItem key={service?._id} value={service?._id}>
                  {service?.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Car"
              value={automobile}
              onChange={handleAutomobileChange}
              helperText="Please select your Car"
              sx={{ mx: 2 }}
            >
              {automobiles.map((automobile: AutomobileType) => (
                <MenuItem key={automobile?._id} value={automobile?._id}>
                  {automobile?.type}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          {/** END 2*/}

          {/**START  3*/}
          <Box mb={2}>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Select Date and Time"
                value={startDate}
                onChange={(newValue) => {
                  if (newValue == null) return;
                  setStartDate(new Date(newValue));
                }}
                minDate={Date.now()}
                renderInput={(params) => <TextField {...params} helperText={params?.inputProps?.placeholder} />}
              />
            </LocalizationProvider> */}
          </Box>

          {/**END 3*/}

          {/** START 4*/}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              mt: 1,
              flexDirection: 'column',
            }}
          >
            <Typography textAlign="center">Enter payment Information</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 300,
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="nameOnCard"
                label="Name on the Card"
                id="nameOnCard"
              />
              <TextField margin="normal" required fullWidth name="cardNumber" label="Card Number" id="cardNumber" />
              <TextField
                margin="normal"
                required
                fullWidth
                name="expiryDate"
                label="Expiry Date (MM/YY)"
                id="expiryDate"
              />
              <TextField margin="normal" required fullWidth name="cvv" label="Security Code" id="cvv" />
            </Box>

            <Button disabled={loading} type="submit" sx={{ my: 2 }} variant="contained">
              Book Appointment
            </Button>
          </Box>
          {/**END 4 */}
          {/**END 1*/}
        </Box>
        <Box>
          <Footer />
          {/** FOR UNFORMITY OF COLOR */}
          <CssBaseline />
        </Box>
      </Box>
    </>
  );
}
