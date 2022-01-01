import { Stack, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

type FooterProps = {};

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="">
        mustikrepair.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const Footer = (props: FooterProps) => {
  return (
    <Box
      id="Contact"
      sx={{ py: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
    >
      <Typography sx={{ py: 4 }}> Want to get in touch?</Typography>
      <Stack direction="row" sx={{ display: 'flex', gap: '20px', mb: 2 }}>
        <Link href="" target="_blank">
          <Tooltip title="Visit my github profile">
            <GitHubIcon />
          </Tooltip>
        </Link>
        <Link href="" target="_blank">
          <Tooltip title="Visit my linkedIn profile">
            <LinkedInIcon />
          </Tooltip>
        </Link>
        <Link href="" target="_blank">
          <Tooltip title="Send me an email">
            <MailIcon />
          </Tooltip>
        </Link>
        <Link href="" target="_blank">
          <Tooltip title="Visit my twitter profile">
            <TwitterIcon />
          </Tooltip>
        </Link>
        <Link href="" target="_blank">
          <Tooltip title="Visit my instagram profile">
            <InstagramIcon />
          </Tooltip>
        </Link>
      </Stack>
      <Copyright />
    </Box>
  );
};
export default Footer;
