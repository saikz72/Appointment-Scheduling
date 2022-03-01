import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../utility/AuthProvider";
import Navbar from "../components/Navbar";
import paintJob from "../assets/paint job 1.jpg";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        AutoReair.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignupPage() {
  let auth = useAuth();
  let location: any = useLocation();
  let navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name: FormDataEntryValue | null = data.get("name");
    const email: FormDataEntryValue | null = data.get("email");
    const password: FormDataEntryValue | null = data.get("password");
    const userType: string = "Customer";

    const user: any = {
      name,
      email,
      password,
      userType,
    };

    auth.signup(user, () => {
      localStorage.setItem("isAuthenticated", "YES");
      navigate(from, { replace: true });
    });
  };

  return (
    <Box width="100%" sx={{ backgroundColor: "#FFFFF" }}>
      <Navbar />
      <Grid id="signup" container component="main">
        <Grid
          item
          xs={5}
          sx={{
            mt: 45,
          }}
        >
          <img width="100%" height="100%" src={paintJob} alt="Logo" />
        </Grid>
        <Grid item xs={7}>
          <Box
            sx={{
              my: 8,
              mx: 10,
              mt: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              align="center"
              variant="h4"
              color="#2F2888"
              sx={{ fontWeight: "bold" }}
              gutterBottom
              component="h1"
            >
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 1,
                "& .MuiTextField-root": { width: "50ch" },
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
              />
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
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <RouterLink
                    to="/ForgotPassword"
                    style={{ textDecoration: "none" }}
                  >
                    <Typography color="primary" sx={{ fontSize: 16 }}>
                      Forgot password?
                    </Typography>
                  </RouterLink>
                </Grid>
                <Grid item>
                  <RouterLink to="/Login" style={{ textDecoration: "none" }}>
                    <Typography color="primary" sx={{ fontSize: 16 }}>
                      Already have an account? Sign in
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
