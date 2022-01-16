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
import { deleteServiceFromServer } from '../services/OfferingService';
import { useData } from '../utility/DataProvider';
import ServiceType from '../types/ServiceType';
import { deleteService } from '../utility/action';
import { Box, Collapse, Modal, TextField } from '@mui/material';
import { updateServiceFromServer } from '../services/OfferingService';
import * as actions from '../utility/action';

interface ServiceInfoCardPropTypes {
  service?: ServiceType;
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

export default function ServiceInfoCard(props: ServiceInfoCardPropTypes) {
  const { state, dispatch } = useData();
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleClose = () => setOpenDeleteModal(false);
  const { service } = props;

  const DeleteModal = (props: any) => {
    const { service } = props;
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
                handleDelete(service);
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
  const handleDelete = async (service?: ServiceType) => {
    deleteServiceFromServer(service?._id).then((result) => {
      if (result?.status === 200) {
        dispatch(deleteService(service));
      }
    });
  };
  const handleEdit = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name: string | undefined = data.get('name')?.toString();
    const duration: number | undefined = Number(data.get('duration')?.toString());
    const cost: number | undefined = Number(data.get('cost')?.toString());

    const service: ServiceType = {
      name,
      duration,
      cost,
    };
    console.log(service);
    updateServiceFromServer(service, service?._id).then((updatedService: ServiceType) => {
      dispatch(actions.updateService(updatedService));
    });
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia component="img" height="140" image={repairLogo1} alt="Service" />
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Name : {service?.name}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          Cost : {service?.cost}$
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          Duration : {service?.duration}mins
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
        <DeleteModal service={service} />
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ display: 'flex', flexDirection: 'column' }} component="form" noValidate onSubmit={handleSubmit}>
          <Box
            mt={2}
            sx={{
              display: 'grid',
            }}
          >
            <TextField margin="normal" fullWidth id="name" label="Service Name" name="name" autoFocus />
            <TextField margin="normal" fullWidth name="duration" label="Service Duration" id="duration" />
            <TextField margin="normal" fullWidth name="cost" label="Service Cost" id="cost" />
          </Box>
          <Button sx={{ marginTop: 2 }} variant="contained" type="submit">
            Update Information
          </Button>
        </Box>
      </Collapse>
    </Card>
  );
}
