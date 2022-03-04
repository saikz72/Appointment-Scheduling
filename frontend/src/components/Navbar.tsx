import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { useAuth } from "utility/AuthProvider";
import { usePersist } from "utility/PersistenceProvider";

const Navbar = () => {
  const persist = usePersist();
  const auth = useAuth();
  const user = auth.user ? auth.user : persist.user;

  return (
    <AppBar position="static">
      <Box
        sx={{
          mx: 8,
        }}
      >
        <Toolbar disableGutters sx={{ display: "flex" }}>
          <Box sx={{ display: "flex" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <IconButton sx={{ p: 0 }}>
                <Avatar src={logo} alt="Logo of the repair shop" />
              </IconButton>
            </Link>

            <Box
              mr={90}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexGrow: 1,
              }}
            >
              <Box>
                <Tooltip title="Go to Homepage">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "white",
                        textTransform: "none",
                        fontSize: 15,
                      }}
                    >
                      Home
                    </Button>
                  </Link>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip title="Book an appointment">
                  <Link to="/Appointment" style={{ textDecoration: "none" }}>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "white",
                        textTransform: "none",
                        fontSize: 15,
                      }}
                    >
                      Appointment
                    </Button>
                  </Link>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip title="Checkout our sevices">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "white",
                        textTransform: "none",
                        fontSize: 15,
                      }}
                    >
                      Services
                    </Button>
                  </Link>
                </Tooltip>
              </Box>

              <Box>
                <Tooltip title="Read more about us">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "white",
                        textTransform: "none",
                        fontSize: 15,
                      }}
                    >
                      About Us
                    </Button>
                  </Link>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip title="Open dashboard">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "white",
                        textTransform: "none",
                        fontSize: 15,
                      }}
                    >
                      Contact Us
                    </Button>
                  </Link>
                </Tooltip>
              </Box>
            </Box>
            <Box>
              <Tooltip title="Buy spare parts">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "white",
                      textTransform: "none",
                      fontSize: 15,
                    }}
                  ></Button>
                </Link>
              </Tooltip>
            </Box>

            <Box sx={{ justifyContent: "flex-end" }}>
              {user && (
                <Tooltip title="Open dashboard">
                  <Link
                    to="/dashboard"
                    style={{ flexGrow: 1, textDecoration: "none" }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        color: "white",
                        borderColor: "white",
                        textTransform: "none",
                        fontSize: 15,
                      }}
                    >
                      My Dashboard
                    </Button>
                  </Link>
                </Tooltip>
              )}
              {!user && (
                <Box sx={{ display: "flex-end" }}>
                  <Link
                    to="/login"
                    style={{ flexGrow: 1, textDecoration: "none" }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        mx: 1,
                        color: "white",
                        borderColor: "white",
                        textTransform: "none",
                        fontSize: 15,
                      }}
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Link
                    to="/Signup"
                    style={{ flexGrow: 1, textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        mx: 1,
                        backgroundColor: "white",
                        color: "#2F2888",
                        textTransform: "none",
                        fontSize: 15,
                      }}
                    >
                      Register
                    </Button>
                  </Link>
                </Box>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
export default Navbar;
