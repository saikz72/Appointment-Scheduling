import * as React from "react";
import { useData } from "../utility/DataProvider";
import ServiceInfoCard from "./ServiceInfoCard";
import ServiceType from "../types/ServiceType";
import { Box, TextField, Button } from "@mui/material";
import { addServiceToServer } from "services/OfferingService";
import * as actions from "../utility/action";

export default function AvailableServices() {
  const { state, dispatch } = useData();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = data.get("name")?.toString();
    const duration = data.get("duration")?.toString();
    const cost = data.get("cost")?.toString();

    const requestBody: any = {
      name,
      duration,
      cost,
    };

    addServiceToServer(requestBody).then((service) => {
      dispatch(actions.addService(service));
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: 40,
          marginBottom: 10,
        }}
        component="form"
        noValidate
        onSubmit={handleSubmit}
        width={500}
      >
        <Box
          mt={2}
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: "repeat(3, 1fr)",
            justifyContent: "center",
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Service Name"
            name="name"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            name="cost"
            label="Service Cost"
            id="cost"
          />
          <TextField
            margin="normal"
            fullWidth
            name="duration"
            label="Service Duration"
            id="duration"
          />
        </Box>
        <Button sx={{ marginTop: 2 }} variant="contained" type="submit">
          Add new Service
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          alignContent: "space-betwenn",
        }}
      >
        {state.services.map((service: ServiceType) => {
          return (
            <Box m={2} key={service?._id}>
              <ServiceInfoCard service={service} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
