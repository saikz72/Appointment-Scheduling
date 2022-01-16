import React from 'react';
import { useData } from '../utility/DataProvider';
import Box from '@mui/material/Box';
import AutomobileInfoCard from './AutomobileInfoCard';
import { Button, TextField } from '@mui/material';
import { useAuth } from '../utility/AuthProvider';
import { addAutomobileToServer, getAutomobilesFromServer } from '../services/AutomobileService';
import * as actions from '../utility/action';
import AutomobileType from '../types/AutomobileType';

export default function AvailableAutomobiles() {
  const { state, dispatch } = useData();
  const { user } = useAuth();
  const [automobiles, setAutomobiles] = React.useState<AutomobileType[]>([]);

  React.useEffect(() => {
    getAutomobilesFromServer(user?._id).then((res: any) => setAutomobiles(res));
  }, [user?._id]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const type: string | undefined = data.get('type')?.toString();
    const year: string | undefined = data.get('year')?.toString();
    const licensePlate: string | undefined = data.get('licensePlate')?.toString();
    const model: string | undefined = data.get('model')?.toString();

    const customerId = user?._id;
    const requestBody: any = {
      type,
      customerId,
      year,
      licensePlate,
      model,
    };

    addAutomobileToServer(requestBody).then((result) => {
      dispatch(actions.addAutomobile(result));
    });
  };

  return (
    <Box>
      <Box
        mb={4}
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
        component="form"
        noValidate
        onSubmit={handleSubmit}
      >
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Box
            component="span"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              '& .MuiTextField-root': { width: '50ch' },
            }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="licensePlate"
              label="License Plate"
              name="licensePlate"
              autoFocus
            />
            <TextField margin="normal" fullWidth id="type" label="Type" name="type" autoFocus />
            <TextField margin="normal" fullWidth id="model" label="Model" name="model" autoFocus />
            <TextField margin="normal" fullWidth id="year" label="Year" name="year" autoFocus />
          </Box>
          <Button sx={{ marginTop: 2 }} variant="contained" type="submit">
            Add Automobile
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignContent: 'space-betwenn' }}>
        {automobiles.map((automobile: AutomobileType) => {
          return (
            <Box mb={2} key={automobile?._id}>
              <AutomobileInfoCard automobile={automobile} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
