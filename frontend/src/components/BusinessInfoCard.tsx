import * as React from 'react';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Collapse, TextField } from '@mui/material';
import BusinessType from '../types/BusinessType';
import { getBusinessInfo, updateBusinessInfo } from '../services/BusinessService';
import * as actions from '../utility/action';
import { useData } from '../utility/DataProvider';

export default function BusinessInfoCard() {
  const [expanded, setExpanded] = React.useState(false);
  const { state, dispatch } = useData();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    getBusinessInfo().then((business) => {
      dispatch(actions.setBusiness(business));
    });
  }, [dispatch]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name: string | undefined = data.get('name')?.toString();
    const email: string | undefined = data.get('email')?.toString();
    const phoneNumber: string | undefined = data.get('phoneNumber')?.toString();
    const address: string | undefined = data.get('address')?.toString();

    const business: BusinessType = {
      name,
      email,
      phoneNumber,
      address,
    };

    updateBusinessInfo(business, state.business?._id).then((updatedBusiness) => {
      dispatch(actions.updateBusiness(updatedBusiness));
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'column' },
        alignItems: 'center',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: 1,
        fontWeight: 'bold',
      }}
    >
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
        }}
        alt="The house from the offer."
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'center' },
          m: 3,
          minWidth: { md: 350 },
        }}
      >
        <Box component="span" sx={{ color: 'primary.main', fontSize: 22 }}>
          {state.business?.name}
        </Box>
        <Box component="span" sx={{ fontSize: 16, mt: 1 }}>
          {state.business?.address}
        </Box>
        <Box component="span" sx={{ fontSize: 16, mt: 1 }}>
          {state.business?.email}
        </Box>
        <Box component="span" sx={{ fontSize: 16, mt: 1 }}>
          {state.business?.phoneNumber}
        </Box>
        <Button
          sx={{
            mt: 1.5,
            p: 0.5,
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
            borderRadius: '5px',
            color: 'primary.main',
            fontWeight: 'medium',
            display: 'flex',
            fontSize: 12,
            alignItems: 'center',
            '& svg': {
              fontSize: 21,
              mr: 0.5,
            },
          }}
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleExpandClick}
        >
          Edit Business Info
        </Button>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column' }} component="form" noValidate onSubmit={handleSubmit}>
            <Box
              mt={2}
              sx={{
                display: 'grid',
                gap: 1,
                gridTemplateColumns: 'repeat(2, 1fr)',
              }}
            >
              <TextField margin="normal" fullWidth id="name" label="Business Name" name="name" autoFocus />
              <TextField margin="normal" fullWidth name="address" label="Street Address" id="address" />
              <TextField margin="normal" fullWidth name="email" label="Business Email" id="email" />
              <TextField margin="normal" fullWidth name="phoneNumber" label="Phone Number" id="phoneNumber" />
            </Box>
            <Button sx={{ marginTop: 2 }} variant="contained" type="submit">
              Update Information
            </Button>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}
