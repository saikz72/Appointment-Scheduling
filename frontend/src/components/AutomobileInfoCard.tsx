import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import repairLogo1 from '../assets/repairLogo1.jpeg';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useData } from '../utility/DataProvider';
import { Alert, Box, Collapse, Modal, TextField } from '@mui/material';
import AutomobileType from '../types/AutomobileType';
import { deleteAutomobileFromServer, updateAutomobileInServer } from '../services/AutomobileService';
import * as actions from '../utility/action';

interface AutomobileInfoCardProps {
  automobile: AutomobileType;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AutomobileInfoCard(props: AutomobileInfoCardProps) {
  const { automobile } = props;
  const { state, dispatch } = useData();
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [updated, setUpdated] = React.useState(false);

  const handleClose = () => setOpenDeleteModal(false);

  const DeleteModal = (props: any) => {
    return (
      <Modal
        open={openDeleteModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want delete this service?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => {
                handleDelete();
                handleClose();
              }}
            >
              Yes
            </Button>
            <Button onClick={handleClose}>No</Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  const handleDelete = async () => {
    if (!automobile?._id) return;
    deleteAutomobileFromServer(automobile._id).then((result) => {
      dispatch(actions.deleteAutomobile(automobile));
    });
  };

  const handleEdit = () => {
    setUpdated(false);
    setExpanded(!expanded);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const type = data.get('type')?.toString();
    const model = data.get('model')?.toString();
    const licensePlate = data.get('licensePlate')?.toString();
    const year = data.get('year')?.toString();

    if (!automobile?._id) return;

    const requestBody: any = {
      type,
      model,
      licensePlate,
      year,
    };

    updateAutomobileInServer(automobile._id, requestBody).then((result) => {
      dispatch(actions.updateAutomobile(result));
      setExpanded(false);
      setUpdated(true);
    });
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia component="img" height="140" image={repairLogo1} alt="Service" />
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Type: {automobile?.type}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          Model: {automobile?.model}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          LicensePlate: {automobile?.licensePlate}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          Year: {automobile?.year}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          size="small"
          onClick={handleEdit}
          variant="contained"
          color="success"
          startIcon={<EditIcon color="primary" />}
        >
          Edit
        </Button>
        <Button
          size="small"
          onClick={() => setOpenDeleteModal(true)}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <DeleteModal />
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ display: 'flex', flexDirection: 'column' }} component="form" noValidate onSubmit={handleSubmit}>
          <Box
            mt={2}
            sx={{
              display: 'grid',
            }}
          >
            <TextField margin="normal" fullWidth id="type" label="Type" name="type" autoFocus />
            <TextField margin="normal" fullWidth name="model" label="Model" id="model" />
            <TextField margin="normal" fullWidth name="licensePlate" label="License Plate" id="licensePlate" />
            <TextField margin="normal" fullWidth name="year" label="Year" id="year" />
          </Box>
          <Button sx={{ marginTop: 2 }} variant="contained" type="submit">
            Update Information
          </Button>
        </Box>
      </Collapse>
      {updated && (
        <Alert variant="filled" severity="success">
          Vehicle Info Updated
        </Alert>
      )}
    </Card>
  );
}
