import { Box, MenuItem, Paper, TextField, Button, Typography, Divider } from '@mui/material';
import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../utility/AuthProvider';
import { LocalizationProvider } from '@mui/lab';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useData } from '../utility/DataProvider';
import ServiceType from '../types/ServiceType';
import AutomobileType from '../types/AutomobileType';
import { getAutomobilesFromServer } from '../services/AutomobileService';
import Footer from '../components/Footer';

export default function BookAppointmentPage() {
  const { user } = useAuth();
  const { state } = useData();
  const [service, setService] = React.useState('');
  const [automobile, setAutomobile] = React.useState('');
  const [automobiles, setAutomobiles] = React.useState<AutomobileType[]>([]);
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [time, setTime] = React.useState<Date | null>(null);

  const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setService(event.target.value as string);
  };

  const handleAutomobileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutomobile(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  React.useEffect(() => {
    getAutomobilesFromServer(user?._id).then((res: any) => setAutomobiles(res));
  }, [user?._id]);

  return (
    <Box sx={{ backgroundColor: (t) => t.palette.grey[200] }}>
      <Navbar />
      {/** START 1*/}
      <Box
        mt={2}
        mx={50}
        component={Paper}
        sx={{
          borderRadius: 4,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} helperText={params?.inputProps?.placeholder} />}
            />
          </LocalizationProvider>
        </Box>
        <Box mb={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Select Time"
              value={time}
              onChange={(newValue) => {
                setTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} helperText={params?.inputProps?.placeholder} />}
            />
          </LocalizationProvider>
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
            '& .MuiTextField-root': { width: '50ch' },
          }}
        >
          <Typography textAlign="center">Enter payment Information</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TextField margin="normal" required fullWidth name="nameOnCard" label="Name on the Card" id="nameOnCard" />
            <TextField margin="normal" required fullWidth name="cardNumber" label="Card Number" id="cardNumber" />
            <TextField margin="normal" required fullWidth name="expiryDate" label="Expiry Date" id="expiryDate" />
            <TextField margin="normal" required fullWidth name="cvv" label="Security Code" id="cvv" />
          </Box>

          <Button sx={{ my: 2 }} variant="contained">
            Book Appointment
          </Button>
        </Box>
        {/**END 4 */}
        {/**END 1*/}
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
}
