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
import { getAllAppointmentsOfTechnician } from '../services/AppointmentService';
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

const TechnicianAppointment = () => {
  const [value, setValue] = React.useState(0);
  const [appointments, setAppointments] = React.useState<any[]>([]);
  const persist = usePersist();
  const auth = useAuth();
  const user = auth.user ? auth.user : persist.user;

  const technicianId: string = user?._id;

  React.useEffect(() => {
    getAllAppointmentsOfTechnician(technicianId)
      .then((response) => {
        console.log(response);
        setAppointments(response);
      })
      .catch((error) => console.log(error));
  }, [technicianId]);

  const handleAccept = () => {};

  const handleReject = () => {};

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const FutureAppointmentsPanel = () => {
    return (
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
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
                  {appointment?.customer?.name}
                </TableCell>
                <TableCell align="right">{appointment?.startDate}</TableCell>
                <TableCell align="right">{appointment?.service?.name}</TableCell>
                <TableCell align="right">{appointment?.service?.cost}</TableCell>
                <TableCell align="right">{appointment?.automobile?.licensePlate}</TableCell>
                <TableCell align="right">{appointment?.status}</TableCell>
                <TableCell align="right">
                  {appointment?.status === 'Pending' && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button sx={{ mx: 1 }} variant="contained" onClick={handleAccept}>
                        Accept
                      </Button>
                      <Button sx={{ mx: 1 }} variant="outlined" color="error" onClick={handleReject}>
                        Reject
                      </Button>
                    </Box>
                  )}
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
      </Box>
    </React.Fragment>
  );
};

export default TechnicianAppointment;
