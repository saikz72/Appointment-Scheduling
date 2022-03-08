import {
  Box,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import { getAllAppointments } from "../services/AppointmentService";
import { useAuth } from "../utility/AuthProvider";
import { usePersist } from "../utility/PersistenceProvider";
import AppointmentType from "types/AppointmentType";

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

const AdminAppointment = () => {
  const [value, setValue] = React.useState(0);
  const [appointments, setAppointments] = React.useState<AppointmentType[]>([]);
  const persist = usePersist();
  const auth = useAuth();
  const user = auth.user ? auth.user : persist.user;

  React.useEffect(() => {
    getAllAppointments()
      .then((response) => {
        console.log(response);
        setAppointments(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const pendingElement = (status: string | null) => {
    if (status === "Pending") {
      return (
        <Typography color="primary" fontSize={11}>
          {status}
        </Typography>
      );
    }
    if (status === "Confirm") {
      return (
        <Typography color="green" fontSize={11}>
          {status}
        </Typography>
      );
    }
    return (
      <Typography color="red" fontSize={11}>
        {status}
      </Typography>
    );
  };

  const FutureAppointmentsPanel = () => {
    return (
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Technician</TableCell>
              <TableCell align="center"> Date</TableCell>
              <TableCell align="center"> Time</TableCell>
              <TableCell align="right">Service</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">License Plate</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow
                key={appointment?._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {appointment?.technician?.name}
                </TableCell>
                <TableCell align="center">
                  {new Date(appointment?.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  {new Date(appointment?.startDate).toLocaleTimeString()}
                </TableCell>
                <TableCell align="right">
                  {appointment?.service?.name}
                </TableCell>
                <TableCell align="right">
                  {appointment?.service?.cost}
                </TableCell>
                <TableCell align="right">
                  {appointment?.automobile?.licensePlate}
                </TableCell>
                <TableCell align="right">
                  {/* <Typography color="red" fontSize={11}>
                      {appointment?.status}
                    </Typography> */}
                  {pendingElement(appointment?.status)}
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
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
      </Box>
    </React.Fragment>
  );
};

export default AdminAppointment;
