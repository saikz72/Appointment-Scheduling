import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  Alert,
  Button,
  Divider,
  TableHead,
  TextField,
  Typography,
} from "@mui/material";
import {
  createTechnician,
  deleteTechnician,
  getAllTechnicians,
} from "../services/AuthService";
import { Modal } from "@mui/material";

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

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}

const rows = [
  createData("Cupcake", 305, 3.7),
  createData("Donut", 452, 25.0),
  createData("Eclair", 262, 16.0),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Gingerbread", 356, 16.0),
  createData("Honeycomb", 408, 3.2),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Jelly Bean", 375, 0.0),
  createData("KitKat", 518, 26.0),
  createData("Lollipop", 392, 0.2),
  createData("Marshmallow", 318, 0),
  createData("Nougat", 360, 19.0),
  createData("Oreo", 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [technicians, setTechnicians] = React.useState<any[]>([]);
  const [revokeAccessModal, setRevokeAccessModal] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    getAllTechnicians().then((technicians: any) => {
      setTechnicians(technicians);
    });
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email: string | undefined = data.get("email")?.toString();
    const password: string | undefined = data.get("password")?.toString();
    const confirmPassword: string | undefined = data
      .get("confirmPassword")
      ?.toString();
    const name: string | undefined = data.get("name")?.toString();

    if (password?.trim() !== confirmPassword?.trim()) {
      //display error message
      return;
    }
    const requestBody: any = {
      email,
      password,
      name,
      userType: "Technician",
    };

    createTechnician(requestBody)
      .then((technician: any) => {
        setTechnicians((state) => [...state, technician]);
      })
      .catch((err) => setError(err.toString()));
  };

  const openModalForTechnicianRemoval = (technician: any) => {
    // setRevokeAccessModal(true);
    handleRevokeAccess(technician);
  };

  const handleRevokeAccess = (technician: any) => {
    const userId = technician?._id;
    const userType = technician?.userType;
    if (userType === undefined || userId === undefined) return;

    const requestBody: any = {
      userId,
      userType,
    };

    deleteTechnician(requestBody)
      .then((response) => {
        // setTechnicians((state) => {
        //   const index = state.findIndex((oldTechnician) => technician?._id === oldTechnician?._id);
        //   if (index >= 0) {
        //     console.log(state);
        //     return state.splice(index, 1);
        //   }
        //   console.log('state', state);
        //   return state;
        // });
        window.location.reload();
      })
      .catch((err) => {
        window.location.reload();
      });
  };

  const RevokeAccessModal = (props: any) => {
    const { technician } = props;

    return (
      <Modal
        open={revokeAccessModal}
        onClose={() => setRevokeAccessModal(false)}
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
                handleRevokeAccess(technician);
                setRevokeAccessModal(false);
              }}
            >
              Yes
            </Button>
            <Button onClick={() => setRevokeAccessModal(false)}>No</Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        {error.length !== 0 && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
        <Box
          sx={{
            display: "grid",
            columnGap: 3,
            rowGap: 1,
            gridTemplateColumns: "repeat(2, 1fr)",
            m: 3,
          }}
        >
          <TextField
            margin="normal"
            id="name"
            label="Name"
            name="name"
            autoFocus
          />
          <TextField margin="normal" name="email" label="Email" id="email" />
          <TextField
            margin="normal"
            type="password"
            name="password"
            label="Password"
            id="password"
          />
          <TextField
            margin="normal"
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            id="confirmPassword"
          />
        </Box>
        <Button sx={{ mx: 60, mb: 4 }} variant="contained" type="submit">
          Add a Technician
        </Button>
      </Box>
      <Divider />
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Technician</TableCell>
              <TableCell align="center"> Email</TableCell>
              <TableCell align="center">Access Control</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {technicians.map((technician) => (
              <TableRow
                key={technician?._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{technician?.name}</TableCell>
                <TableCell align="center">{technician?.email}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      sx={{ mx: 1 }}
                      variant="outlined"
                      color="error"
                      onClick={() => handleRevokeAccess(technician)}
                    >
                      Revoke Access
                    </Button>
                  </Box>
                  <RevokeAccessModal technician={technician} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableContainer>
  );
}
