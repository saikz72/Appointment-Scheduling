import {
  Box,
  Button,
  Card,
  MenuItem,
  Modal,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { getAllAppointmentsOfCustomer } from '../services/AppointmentService';
import { useAuth } from '../utility/AuthProvider';
import { usePersist } from '../utility/PersistenceProvider';
import DateTimePicker from 'react-datetime-picker';
import AutomobileType from '../types/AutomobileType';
import ServiceType from '../types/ServiceType';
import { useData } from '../utility/DataProvider';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Appointment = () => {
  const [value, setValue] = React.useState(0);
  const [openCancelModal, setOpenCancelModal] = React.useState(false);
  const [service, setService] = React.useState('');
  const [automobile, setAutomobile] = React.useState('');
  const [automobiles, setAutomobiles] = React.useState<AutomobileType[]>([]);
  const { state } = useData();
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [appointments, setAppointments] = React.useState<any[]>([]);
  const persist = usePersist();
  const auth = useAuth();
  const user = auth.user ? auth.user : persist.user;

  const customerId: string = user?._id;

  React.useEffect(() => {
    getAllAppointmentsOfCustomer(customerId)
      .then((response) => setAppointments(response))
      .catch((error) => console.log(error));
  }, [customerId]);

  const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const CancelModal = (props: any) => {
    return (
      <Modal
        open={openCancelModal}
        onClose={() => setOpenCancelModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align="center" id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to cancel this appointment?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => {
                handleCancel();
                setOpenCancelModal(false);
              }}
            >
              Yes
            </Button>
            <Button onClick={() => setOpenCancelModal(false)}>No</Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setService(event.target.value as string);
  };

  const handleAutomobileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutomobile(event.target.value as string);
  };

  const AppointmentUpdateContent = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
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
            <Box
              component="form"
              noValidate
              onSubmit={() => console.log('here')}
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
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  const EditModal = (props: any) => {
    return (
      <Modal
        open={openEditModal}
        onClose={() => setOpenCancelModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AppointmentUpdateContent />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => {
                handleEdit();
                setOpenEditModal(false);
              }}
              sx={{ my: 2, mx: 2 }}
              variant="contained"
            >
              Update
            </Button>
            <Button color="error" sx={{ my: 2, mx: 2 }} variant="contained" onClick={() => setOpenEditModal(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  const handleEdit = () => {};

  const handleCancel = () => {};

  const FutureAppointmentsPanel = () => {
    return (
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Technician</TableCell>
              <TableCell align="center"> Date</TableCell>
              <TableCell align="right">Service</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">License Plate</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {appointment?.technician?.name}
                </TableCell>
                <TableCell align="right">{appointment?.startDate}</TableCell>
                <TableCell align="right">{appointment?.service?.name}</TableCell>
                <TableCell align="right">{appointment?.service?.cost}</TableCell>
                <TableCell align="right">{appointment?.automobile?.licensePlate}</TableCell>
                <TableCell align="right">{appointment?.status}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button sx={{ mx: 1, px: 3 }} variant="contained" onClick={() => setOpenEditModal(true)}>
                      Edit
                    </Button>
                    <Button sx={{ mx: 1 }} variant="outlined" color="error" onClick={() => setOpenCancelModal(true)}>
                      Cancel
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <React.Fragment>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
            variant="fullWidth"
          >
            <Tab label="Appointments" {...a11yProps(0)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <FutureAppointmentsPanel />
          </TabPanel>
        </Box>
        <CancelModal />
        <EditModal />
      </Box>
    </React.Fragment>
  );
};

export default Appointment;
