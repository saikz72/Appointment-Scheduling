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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface ServiceCardProps {
  serviceName: string;
  description: string;
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
  const { serviceName, description } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box m="12px">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={serviceName} sx={{ textAlign: 'center' }} />
        <CardMedia component="img" height="194" image={repairLogo1} alt="Paella dish" />
        <CardContent>
          <Typography variant="body2" color="primary">
            Expand the card to learn more about this service....
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}
