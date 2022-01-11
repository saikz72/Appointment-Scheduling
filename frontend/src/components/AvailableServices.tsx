import * as React from 'react';
import { useData } from '../utility/DataProvider';
import ServiceInfoCard from './ServiceInfoCard';
import ServiceType from '../types/ServiceType';
import Box from '@mui/material/Box';

export default function AvailableServices() {
  const { state, dispatch } = useData();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignContent: 'space-betwenn' }}>
      {state.services.map((service: ServiceType) => {
        return (
          <Box mb={2} key={service?._id}>
            <ServiceInfoCard service={service} />
          </Box>
        );
      })}
    </Box>
  );
}
