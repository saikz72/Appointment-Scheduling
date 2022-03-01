import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import repairLogo1 from "../assets/repairLogo1.jpeg";
import { Box } from "@mui/material";
import ServiceType from "../types/ServiceType";

interface ServiceCardProps {
  serviceName?: string;
}

export default function ServiceCard(props: ServiceCardProps) {
  const { serviceName } = props;

  const imgService = (serviceName: string | null | undefined) => {
    if (serviceName === "Repairs") {
      return (
        <CardMedia
          component="img"
          height="140"
          image={repairLogo1}
          alt="Service"
        />
      );
    }
    if (serviceName === "Car Wash") {
      return (
        <CardMedia
          component="img"
          height="140"
          image={repairLogo1}
          alt="Service"
        />
      );
    }
    if (serviceName === "Inspections") {
      return (
        <CardMedia
          component="img"
          height="140"
          image={repairLogo1}
          alt="Service"
        />
      );
    }
    if (serviceName === "Oil Change") {
      return (
        <CardMedia
          component="img"
          height="140"
          image={repairLogo1}
          alt="Service"
        />
      );
    }
    if (serviceName === "Tyre Change") {
      return (
        <CardMedia
          component="img"
          height="140"
          image={repairLogo1}
          alt="Service"
        />
      );
    }
    if (serviceName === "Towing") {
      return (
        <CardMedia
          component="img"
          height="140"
          image={repairLogo1}
          alt="Service"
        />
      );
    } else {
      return null;
    }
  };

  return (
    <Box m="8px" sx={{ backgroundColor: "#FAFBFF" }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={serviceName} sx={{ textAlign: "center" }} />
        {/* <CardMedia
          component="img"
          height="140"
          image={repairLogo1}
          alt="Service"
        /> */}
        {imgService(serviceName)}

        <CardContent>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* <Typography variant="h6" color="primary" gutterBottom>
              Cost : {service?.cost}$
            </Typography> */}
            {/* <Typography variant="h6" color="primary" gutterBottom>
              Duration : {service?.duration}mins
            </Typography> */}
          </CardContent>
        </CardContent>
      </Card>
    </Box>
  );
}
