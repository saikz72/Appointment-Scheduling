import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useAuth } from '../utility/AuthProvider';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Card, Radio, RadioGroup } from '@mui/material';
import Navbar from '../components/Navbar';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LoginPage() {
  let auth = useAuth();
  let location: any = useLocation();
  let navigate = useNavigate();
  let from = location.state?.from?.pathname || '/';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email: FormDataEntryValue | null = data.get('email');
    const password: FormDataEntryValue | null = data.get('password');
    const userType: FormDataEntryValue | null = data.get('userType');

    const user: any = {
      email,
      password,
      userType,
    };

    auth.signin(user, () => {
      localStorage.setItem('isAuthenticated', 'YES');
      navigate(from, { replace: true });
    });
  };

  return (
    <Box>
      <Navbar />
      <Grid
        id="Signin"
        container
        component="main"
        sx={{
          height: '100vh',
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            component={Card}
            sx={{
              backgroundColor: (t) => t.palette.primary.light,
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', mt: 1, '& .MuiTextField-root': { width: '50ch' } }}
            >
              <Typography>Select the role that applies to you</Typography>
              <RadioGroup row aria-label="userType" name="userType">
                <FormControlLabel value="Customer" control={<Radio />} label="Customer" defaultChecked={true} />
                <FormControlLabel value="Technician" control={<Radio />} label="Technician" />
                <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
              </RadioGroup>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <RouterLink to="/ForgotPassword" style={{ textDecoration: 'none' }}>
                    <Typography color="primary">Forgot password?</Typography>
                  </RouterLink>
                </Grid>
                <Grid item>
                  <RouterLink to="/Signup" style={{ textDecoration: 'none' }}>
                    <Typography color="primary">Don't have an account? Sign Up</Typography>
                  </RouterLink>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
