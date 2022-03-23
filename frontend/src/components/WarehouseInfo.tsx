import { Box, TextField, Button } from "@mui/material";
import React from "react";
import ServiceType from "types/ServiceType";
import ServiceInfoCard from "./ServiceInfoCard";
import Product from "../components/Product";

export default function WarehouseInfo() {
  const [products, setProducts] = React.useState([
    {
      id: "61fa0bfa1f43783d7231223d",
      name: "hammer",
      cost: 100,
      description: "",
    },
    {
      id: "61fa0bfa1f43783d7231223d",
      name: "Battery",
      cost: 1000,
      description: "",
    },
    {
      id: "61fa0bfa1f43783d7231223d",
      name: "Break",
      cost: 1000,
      description: "",
    },
    {
      id: "61fa0bfa1f43783d7231223d",
      name: "hammer",
      cost: 200,
      description: "",
    },
  ]);

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

    // addServiceToServer(requestBody).then((service) => {
    //   dispatch(actions.addService(service));
    // });
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
            gridTemplateColumns: "repeat(2, 1fr)",
            justifyContent: "center",
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Sparepart Name"
            name="name"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            name="cost"
            label="Sparepart Cost"
            id="cost"
          />
        </Box>
        <TextField
          margin="normal"
          fullWidth
          name="description"
          label="Description"
          id="description"
          multiline
          minRows={4}
        />
        <Button sx={{ marginTop: 2 }} variant="contained" type="submit">
          Add Spare part
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
        {products.map((product: any) => {
          return (
            <Box m={2} key={product?._id}>
              {/* <ServiceInfoCard service={service} /> */}
              <Product product={product} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
