import {
  Box,
  MenuItem,
  TextField,
  Button,
  Typography,
  Card,
  Alert,
  CircularProgress,
  Chip,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
} from '@mui/material';
import React from 'react';
import Navbar from '../components/Navbar';
import DateTimePicker from 'react-datetime-picker';
import { useData } from '../utility/DataProvider';
import ServiceType from '../types/ServiceType';
import AutomobileType from '../types/AutomobileType';
import { getAutomobilesFromServer } from '../services/AutomobileService';
import { getAllProductsFromServer } from '../services/ProductService';
import Footer from '../components/Footer';
import { bookAppointment } from '../services/AppointmentService';
import { blue } from '@mui/material/colors';
import { usePersist } from '../utility/PersistenceProvider';
import { useAuth } from '../utility/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import ProductType from 'types/ProductType';

function generateRandom(min = 0, max = 100) {
  // find diff
  let difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  // add with min value
  rand = rand + min;

  return rand;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  name: string | undefined,
  parts: readonly string[],
  theme: Theme,
) {
  if (name === undefined) {
    return;
  }
  return {
    fontWeight:
      parts.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function BookAppointmentPage() {
  const persist = usePersist();
  const auth = useAuth();
  const { state } = useData();
  const navigate = useNavigate();
  const [service, setService] = React.useState('');
  const [automobile, setAutomobile] = React.useState('');
  const [automobiles, setAutomobiles] = React.useState<AutomobileType[]>([]);
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [status, setStatus] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [parts, setParts] = React.useState<string[]>([]);
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const [description, setDescription] = React.useState<String>('');
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [fee, setFee] = React.useState<number>(0);
  const theme = useTheme();

  const user = auth.user ? auth.user : persist.user;

  const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setService(val as string);
    const rand = generateRandom(500, 1000);
    setFee(fee => rand);
  };

  const handleAutomobileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAutomobile(event.target.value as string);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value as string);
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
      productNames: parts,
      description: description,
    };

    if (nameOnCard === null || nameOnCard?.trim().length === 0) {
      setError(true);
      setErrorMessage('Name cannot be empty');
      return;
    }
    if (isNaN(Number(cardNumber))) {
      setError(true);
      setErrorMessage('Card number must only contain numbers');
      return;
    }

    if (cardNumber?.length !== 16) {
      setError(true);
      setErrorMessage('Card number must be 16 digits long');
      return;
    }

    if (isNaN(Number(cvv))) {
      setError(true);
      setErrorMessage('Cvv must only contain numbers');
      return;
    }

    if (cvv?.length !== 3) {
      setError(true);
      setErrorMessage('Cvv must be 3 numbers long');
      return;
    }

    if (isNaN(Number(expiryDate))) {
      setError(true);
      setErrorMessage('Expiry date must only contain numbers');
      return;
    }

    if (expiryDate?.length !== 4) {
      setError(true);
      setErrorMessage('Expiry date must be 4 numbers long');
      return;
    }
    console.log(requestBody);
    if (!loading) {
      setLoading(true);
      try {
        const response = await bookAppointment(requestBody);
        setStatus('book');
        setError(false);
        setErrorMessage('');
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setErrorMessage('Fail to book appointment.');
        setLoading(false);
      }
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof parts>) => {
    const {
      target: { value },
    } = event;

    console.log(value);
    setParts(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  React.useEffect(() => {
    getAutomobilesFromServer(user?._id).then((res: any) => setAutomobiles(res));
    getAllProductsFromServer().then((res: any) => {
      setProducts(res.data);
    });
  }, [user?._id]);

  return (
    <Box bgcolor="#FAFBFF">
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#FAFBFF',
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
        {error && (
          <Alert variant="filled" severity="error">
            {errorMessage}
          </Alert>
        )}
        {status === 'book' && (
          <Alert variant="filled" severity="success">
            Appointment has been booked successfully!
          </Alert>
        )}
        {status === 'book' && (
          <>
            <Link
              to="/dashboard"
              style={{ flexGrow: 1, textDecoration: 'none' }}
            >
              <Button color="success">Click here to view appointment</Button>
            </Link>
          </>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#FAFBFF',
        }}
      >
        {/** START 1*/}
        <Box
          mt={2}
          component={Card}
          elevation={4}
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
              {state.services.map((service: ServiceType) => {
                if (!service || !service.cost || !service._id) {
                  return null;
                }
                const val = [service._id, service.cost.toString()];
                return (
                  <MenuItem key={service?._id} value={service?._id}>
                    {service.name}
                  </MenuItem>
                );
              })}
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
          <Typography textAlign="center" variant="h6">
            Select spare parts
          </Typography>
          <Select
            sx={{ mb: 4, width: 300 }}
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            fullWidth
            value={parts}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map(value => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {products.map(product => (
              <MenuItem
                key={product?.name}
                value={product?.name}
                style={getStyles(product?.name, parts, theme)}
              >
                {product?.name}
              </MenuItem>
            ))}
          </Select>
          {/** END 2*/}

          {/**START  3*/}
          <Box mb={2}>
            <DateTimePicker
              amPmAriaLabel="Select AM/PM"
              calendarAriaLabel="Toggle calendar"
              clearAriaLabel="Clear value"
              dayAriaLabel="Day"
              hourAriaLabel="Hour"
              maxDetail="second"
              minuteAriaLabel="Minute"
              monthAriaLabel="Month"
              nativeInputAriaLabel="Date and time"
              onChange={setStartDate}
              secondAriaLabel="Second"
              value={startDate}
              yearAriaLabel="Year"
            />
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
            <Box>
              <Typography textAlign="center" variant="h6">
                Description of problem
              </Typography>
              <Box width={300}>
                <TextField
                  margin="normal"
                  multiline
                  minRows={5}
                  value={description}
                  onChange={handleDescriptionChange}
                  fullWidth
                  name="description"
                  label="Please input details of the problem here."
                  id="description"
                />
              </Box>
            </Box>
            <Typography textAlign="center" variant="h6">
              Enter payment Information
            </Typography>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="cardNumber"
                label="Card Number"
                id="cardNumber"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="expiryDate"
                label="Expiry Date (MMYY)"
                id="expiryDate"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="cvv"
                label="CVV"
                id="cvv"
              />
            </Box>
            <Button
              disabled={loading}
              type="submit"
              sx={{ my: 2 }}
              variant="contained"
            >
              Book Appointment
            </Button>
            <Typography textAlign="center" variant="h6" color="primary">
              Total Fee: {fee}
            </Typography>
          </Box>
          {/**END 4 */}
          {/**END 1*/}
        </Box>
        <Box m={12}>
          <Footer />
          {/** FOR UNFORMITY OF COLOR */}
        </Box>
      </Box>
    </Box>
  );
}
