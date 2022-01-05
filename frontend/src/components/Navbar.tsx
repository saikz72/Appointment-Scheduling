import { AppBar, Avatar, CssBaseline, Stack, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import userPhoto from '../assets/pj.jpeg';

const Navbar = () => {
  return (
    <div style={{ marginTop: 8 }}>
      <CssBaseline />
      <AppBar
        position="sticky"
        enableColorOnDark={true}
        elevation={0}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.background.default,
        }}
      >
        <Toolbar>
          <Link to="/" style={{ flexGrow: 1, textDecoration: 'none' }}>
            <Avatar src={logo} alt="Logo of the repair shop" />
            <Typography color="secondary">Home</Typography>
          </Link>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: 2 }}>
              <Avatar alt="User's Dashboard" src={userPhoto} />
              <Typography color="secondary">Dashboard</Typography>
            </Stack>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
