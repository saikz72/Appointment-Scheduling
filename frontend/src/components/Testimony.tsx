import { Card, CardContent, Stack, CardMedia, Divider, Typography, Box } from '@mui/material';
import repairLogo1 from '../assets/repairLogo1.jpeg';

type TestimonyProps = {
  description: string;
  author: string;
  date: string;
};

const Testimony = ({ author, description, date }: TestimonyProps) => {
  return (
    <Box m="8px">
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Stack direction="column">
            <CardMedia component="img" height="100vh" image={repairLogo1} alt="Company Logo" />
            <Divider />

            <Stack direction="column">
              <Typography paragraph gutterBottom variant="subtitle1">
                {description}
              </Typography>
            </Stack>
            <Stack direction="row">
              <Typography align="left" variant="subtitle2" marginRight="4px">
                Date:
              </Typography>
              <Typography align="left" gutterBottom variant="subtitle2">
                {date}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Testimony;
