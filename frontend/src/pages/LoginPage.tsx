import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useAuth } from '../utility/AuthProvider';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Alert, Radio, RadioGroup } from '@mui/material';
import Navbar from '../components/Navbar';
import landingPage from '../assets/landing-hero.png';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ fontSize: 16 }}
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        AutoReair.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LoginPage() {
  const [loading, setLoading] = React.useState(false);
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
    setTimeout(() => setLoading(true), 1000);
  };

  setTimeout(() => setLoading(false), 10000);

  return (
    <Box width="100%" sx={{ backgroundColor: '#FAFBFF' }}>
      <Navbar />
      <Grid id="Signin" container component="main">
        <Grid
          item
          xs={5}
          sx={{
            mt: 45,
          }}
        >
          <img width="100%" height="100%" src={landingPage} alt="Logo" />
        </Grid>
        <Grid item xs={7}>
          <Box
            sx={{
              my: 8,
              mx: 10,
              mt: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {loading && (
              <Alert variant="filled" severity="error">
                Fail to authenticate, Input correct Email & Password
              </Alert>
            )}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              align="center"
              variant="h4"
              color="#2F2888"
              sx={{ fontWeight: 'bold' }}
              gutterBottom
              component="h1"
            >
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: 1,
                '& .MuiTextField-root': { width: '50ch' },
              }}
            >
              <Typography
                align="center"
                variant="h6"
                color="#2F2888"
                sx={{ fontWeight: 'bold' }}
                gutterBottom
              >
                Select the role that applies to you
              </Typography>
              <RadioGroup row aria-label="userType" name="userType">
                <FormControlLabel
                  value="Customer"
                  control={<Radio />}
                  label="Customer"
                  defaultChecked={true}
                />
                <FormControlLabel
                  value="Technician"
                  control={<Radio />}
                  label="Technician"
                />
                <FormControlLabel
                  value="Admin"
                  control={<Radio />}
                  label="Admin"
                />
              </RadioGroup>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontSize: 16 }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  <RouterLink
                    to="/ForgotPassword"
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography color="primary" sx={{ fontSize: 16 }}>
                      Forgot password?
                    </Typography>
                  </RouterLink>
                </Grid>
                <Grid item>
                  <RouterLink to="/Signup" style={{ textDecoration: 'none' }}>
                    <Typography color="primary" sx={{ fontSize: 16 }}>
                      Don't have an account? Sign Up
                    </Typography>
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
