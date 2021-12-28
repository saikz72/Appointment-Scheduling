import { AppBar, CssBaseline, Stack, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="absolute"
        enableColorOnDark={true}
        elevation={0}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.background.default,
        }}
      >
        <Toolbar>
          <Link to="/" style={{ flexGrow: 1 }}>
            <Typography color="secondary">Auto Repair</Typography>
          </Link>
          <Link to="/dashboard">
            <Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: 2 }}>
              <Typography color="secondary">Dashboard</Typography>
            </Stack>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
