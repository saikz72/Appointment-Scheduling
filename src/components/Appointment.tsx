import {
  Box,
  Button,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from '@mui/material';
import React from 'react';
import { getAllAppointmentsOfCustomer } from '../services/AppointmentService';
import { useAuth } from '../utility/AuthProvider';
import { usePersist } from '../utility/PersistenceProvider';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

  function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

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
                    <Button sx={{ mx: 1, px: 3 }} variant="contained">
                      Edit
                    </Button>
                    <Button sx={{ mx: 1 }} variant="outlined" color="error">
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

  const PastAppointmentsPanel = () => {
    return (
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Technician</TableCell>
              <TableCell align="right"> Date</TableCell>
              <TableCell align="right">Service</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">License Plate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
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
            <Tab label="Future appointments" {...a11yProps(0)} />
            <Tab label="Past appointments" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <FutureAppointmentsPanel />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PastAppointmentsPanel />
          </TabPanel>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Appointment;
