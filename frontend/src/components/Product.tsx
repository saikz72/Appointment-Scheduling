import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import repairLogo1 from "../assets/repairLogo1.jpeg";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteServiceFromServer } from "../services/OfferingService";
import { useData } from "../utility/DataProvider";
import ServiceType from "../types/ServiceType";
import { deleteService } from "../utility/action";
import { Box, Collapse, Modal, TextField } from "@mui/material";
import { updateServiceFromServer } from "../services/OfferingService";
import * as actions from "../utility/action";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Product(props: any) {
  const { state, dispatch } = useData();
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleClose = () => setOpenDeleteModal(false);
  const { product } = props;

  const DeleteModal = (props: any) => {
    const { product } = props;
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
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => {
                handleDelete(product);
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
  const handleDelete = async (product?: any) => {
    deleteServiceFromServer(product?._id).then((result) => {
      if (result?.status === 200) {
        dispatch(deleteService(product));
      }
    });
  };
  const handleEdit = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name: string | undefined = data.get("name")?.toString();
    const duration: number | undefined = Number(
      data.get("duration")?.toString()
    );
    const cost: number | undefined = Number(data.get("cost")?.toString());

    const service: ServiceType = {
      name,
      duration,
      cost,
    };
    // updateServiceFromServer(service, service?._id).then((updatedService: ServiceType) => {
    //   dispatch(actions.updateService(updatedService));
    // });
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" color="primary" gutterBottom>
          Name : {product?.name}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          Cost : {product?.cost}$
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          Description : {product?.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
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
        <DeleteModal product={product} />
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box
          sx={{ display: "flex", flexDirection: "column" }}
          component="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <Box
            mt={2}
            sx={{
              display: "grid",
            }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Spare part Name"
              name="name"
              autoFocus
            />

            <TextField
              margin="normal"
              fullWidth
              name="cost"
              label="Spare part Cost"
              id="cost"
            />
            <TextField
              margin="normal"
              fullWidth
              name="description"
              label="Description"
              id="description"
            />
          </Box>
          <Button sx={{ marginTop: 2 }} variant="contained" type="submit">
            Update Information
          </Button>
        </Box>
      </Collapse>
    </Card>
  );
}
