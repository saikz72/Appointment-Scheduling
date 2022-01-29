import * as React from 'react';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Collapse, TextField } from '@mui/material';
import BusinessType from '../types/BusinessType';
import { updateBusinessInfo } from '../services/BusinessService';
import * as actions from '../utility/action';
import { useData } from '../utility/DataProvider';
import profilePicture from '../assets/img_avatar.png';
import { useAuth } from '../utility/AuthProvider';
import { usePersist } from '../utility/PersistenceProvider';

export default function ProfileSettingsCard() {
  const [expanded, setExpanded] = React.useState(false);
  const persist = usePersist();
  const auth = useAuth();
  const user = auth.user ? auth.user : persist.user;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name: string | undefined = data.get('name')?.toString();
    const email: string | undefined = data.get('email')?.toString();
    const password: string | undefined = data.get('phoneNumber')?.toString();
    const confirmPassword: string | undefined = data.get('address')?.toString();

    const userUpdate: any = {
      name,
      email,
      password,
      confirmPassword,
    };

    // updateBusinessInfo(business, state.business?._id).then((updatedBusiness) => {
    //   dispatch(actions.updateBusiness(updatedBusiness));
    // });
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
          height: 350,
          width: 350,
          borderRadius: 10,
        }}
        alt="The house from the offer."
        src={profilePicture}
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
          Name : {user?.name}
        </Box>
        <Box component="span" sx={{ fontSize: 16, mt: 1 }}>
          Email : {user?.email}
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
          Edit Profile Info
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
              <TextField margin="normal" fullWidth id="name" label="Name" name="name" autoFocus />
              <TextField margin="normal" fullWidth name="email" label="Email" id="email" />
              <TextField margin="normal" fullWidth type="password" name="password" label="Password" id="password" />
              <TextField
                margin="normal"
                fullWidth
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
              />
            </Box>
            <Button sx={{ marginTop: 2 }} variant="contained" type="submit">
              Update Profile
            </Button>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}
