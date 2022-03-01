import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import userPhoto from "../assets/pj.jpeg";
import { useAuth } from "utility/AuthProvider";
import { usePersist } from "utility/PersistenceProvider";

const pages = ["Home", "Appointment", "Services", "Store", "About", "Contact"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const persist = usePersist();
  const auth = useAuth();
  const user = auth.user ? auth.user : persist.user;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Box
        sx={{
          mx: 8,
        }}
      >
        <Toolbar disableGutters sx={{ display: "flex" }}>
          <Box sx={{ justifyContent: "flex-start" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <IconButton sx={{ p: 0 }}>
                <Avatar src={logo} alt="Logo of the repair shop" />
              </IconButton>
            </Link>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ justifyContent: "center" }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                  fontSize: 15,
                  ml: 1,
                }}
              >
                {page}
              </Button>
            ))}
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
                      mx: 1,
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
              <Box sx={{ display: "flex" }}>
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
                    Sign up
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
export default Navbar;
