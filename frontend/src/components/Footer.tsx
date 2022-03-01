import { Stack, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/Mail";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

type FooterProps = {};

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="">
        mustikrepair.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Footer = (props: FooterProps) => {
  return (
    <Box
      id="Contact"
      sx={{
        py: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FAFBFF",
      }}
    >
      <Typography
        align="center"
        variant="h2"
        mt={4}
        color="#2F2888"
        sx={{ fontWeight: "bold" }}
        gutterBottom
      >
        Contact
      </Typography>
      <Stack direction="row" sx={{ display: "flex", gap: "40px", mb: 2 }}>
        <Link href="" target="_blank">
          <Tooltip title="Visit my linkedIn profile">
            <LinkedInIcon fontSize="large" />
          </Tooltip>
        </Link>
        <Link href="" target="_blank">
          <Tooltip title="Send me an email">
            <MailIcon fontSize="large" />
          </Tooltip>
        </Link>
        <Link href="" target="_blank">
          <Tooltip title="Visit my twitter profile">
            <TwitterIcon fontSize="large" />
          </Tooltip>
        </Link>
        <Link href="" target="_blank">
          <Tooltip title="Visit my instagram profile">
            <InstagramIcon fontSize="large" />
          </Tooltip>
        </Link>
      </Stack>
      <Copyright />
    </Box>
  );
};
export default Footer;
