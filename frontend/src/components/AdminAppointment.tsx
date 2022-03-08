import {
  Box,
  Button,
  Modal,
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
import DateTimePicker from "react-datetime-picker";
import AppointmentType from "types/AppointmentType";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
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

const AdminAppointment = () => {
  const [value, setValue] = React.useState(0);
  const [openCancelModal, setOpenCancelModal] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [openEditModal, setOpenEditModal] = React.useState(false);
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

  const CancelModal = (props: any) => {
    return (
      <Modal
        open={openCancelModal}
        onClose={() => setOpenCancelModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            align="center"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Are you sure you want to cancel this appointment?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
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

  const AppointmentUpdateContent = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/** START 1*/}
          <Box
            mt={2}
            sx={{
              borderRadius: 4,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              width: 500,
            }}
          >
            {/** START 2*/}

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
          <Box sx={{ display: "flex", justifyContent: "center" }}>
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
            <Button
              color="error"
              sx={{ my: 2, mx: 2 }}
              variant="contained"
              onClick={() => setOpenEditModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

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
                <TableCell align="right">
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
        <CancelModal />
        <EditModal />
      </Box>
    </React.Fragment>
  );
};

export default AdminAppointment;
