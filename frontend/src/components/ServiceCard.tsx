import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import repairLogo1 from '../assets/repairLogo1.jpeg';
import { Box } from '@mui/material';
import ServiceType from '../types/ServiceType';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface ServiceCardProps {
  service?: ServiceType;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ServiceCard(props: ServiceCardProps) {
  const { service } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box m="12px">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={service?.name} sx={{ textAlign: 'center' }} />
        <CardMedia component="img" height="140" image={repairLogo1} alt="Service" />
        <CardActions disableSpacing>
          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CardContent
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
            >
              <Typography variant="h6" color="primary" gutterBottom>
                Cost : {service?.cost}$
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                Duration : {service?.duration}mins
              </Typography>
            </CardContent>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}
