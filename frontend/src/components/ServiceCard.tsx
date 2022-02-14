import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import repairLogo1 from '../assets/repairLogo1.jpeg';
import { Box } from '@mui/material';
import ServiceType from '../types/ServiceType';

interface ServiceCardProps {
  service?: ServiceType;
}

export default function ServiceCard(props: ServiceCardProps) {
  const { service } = props;

  return (
    <Box m="12px">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={service?.name} sx={{ textAlign: 'center' }} />
        <CardMedia component="img" height="140" image={repairLogo1} alt="Service" />
        <CardContent>
          <CardContent
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
          >
            <Typography variant="h6" color="primary" gutterBottom>
              Cost : {service?.cost}$
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              Duration : {service?.duration}mins
            </Typography>
          </CardContent>
        </CardContent>
      </Card>
    </Box>
  );
}
