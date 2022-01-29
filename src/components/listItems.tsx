import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, List, useTheme } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { green, red } from '@mui/material/colors';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import BusinessIcon from '@mui/icons-material/Business';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

interface propsTypes {
  setMenuItemSelected: (s: string) => void;
  setOpenLogoutModal: (open: boolean) => void;
  userType: string;
}

export const MainListItems = ({ setMenuItemSelected, setOpenLogoutModal, userType }: propsTypes) => {
  const theme = useTheme();

  return (
    <List>
      <ListItem button onClick={() => setMenuItemSelected('Appointments')}>
        <ListItemIcon>
          <DashboardIcon sx={{ color: theme.palette.primary.main }} />
        </ListItemIcon>
        <ListItemText
          primary="Appointments"
          primaryTypographyProps={{ fontSize: 13, fontWeight: 'medium', lineHeight: '20px', mb: '2px' }}
          sx={{ my: 0 }}
        />
      </ListItem>
      {/* {userType === 'Customer' && (
        <ListItem button onClick={() => setMenuItemSelected('Bills')}>
          <ListItemIcon>
            <FileCopyIcon sx={{ color: green[900] }} />
          </ListItemIcon>
          <ListItemText
            primary="Bills"
            primaryTypographyProps={{ fontSize: 13, fontWeight: 'medium', lineHeight: '20px', mb: '2px' }}
            sx={{ my: 0 }}
          />
        </ListItem>
      )} */}
      <ListItem button onClick={() => setMenuItemSelected('Profile Settings')}>
        <ListItemIcon>
          <PeopleIcon sx={{ color: theme.palette.primary.main }} />
        </ListItemIcon>
        <ListItemText
          primary="Profile Settings"
          primaryTypographyProps={{ fontSize: 13, fontWeight: 'medium', lineHeight: '20px', mb: '2px' }}
          sx={{ my: 0 }}
        />
      </ListItem>
      {userType === 'Admin' && (
        <ListItem button onClick={() => setMenuItemSelected('Technicians')}>
          <ListItemIcon>
            <PeopleIcon sx={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          <ListItemText
            primary="Technicians"
            primaryTypographyProps={{ fontSize: 13, fontWeight: 'medium', lineHeight: '20px', mb: '2px' }}
            sx={{ my: 0 }}
          />
        </ListItem>
      )}
      {userType === 'Customer' && (
        <ListItem button onClick={() => setMenuItemSelected('Automobiles')}>
          <ListItemIcon>
            <DirectionsCarIcon sx={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          <ListItemText
            primary="Automobiles"
            primaryTypographyProps={{ fontSize: 13, fontWeight: 'medium', lineHeight: '20px', mb: '2px' }}
            sx={{ my: 0 }}
          />
        </ListItem>
      )}
      <ListItem button onClick={() => setMenuItemSelected('Orders')}>
        <ListItemIcon>
          <ShoppingCartIcon sx={{ color: green[900] }} />
        </ListItemIcon>
        <ListItemText
          primary="Orders"
          primaryTypographyProps={{ fontSize: 13, fontWeight: 'medium', lineHeight: '20px', mb: '2px' }}
          sx={{ my: 0 }}
        />
      </ListItem>
      {userType === 'Admin' && (
        <ListItem button onClick={() => setMenuItemSelected('Business Info')}>
          <ListItemIcon>
            <HomeRepairServiceIcon sx={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          <ListItemText
            primary="Business Info"
            primaryTypographyProps={{ fontSize: 13, fontWeight: 'medium', lineHeight: '20px', mb: '2px' }}
            sx={{ my: 0 }}
          />
        </ListItem>
      )}
      {userType === 'Admin' && (
        <ListItem button onClick={() => setMenuItemSelected('Available Services')}>
          <ListItemIcon>
            <BusinessIcon sx={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          <ListItemText
            primary="Available Services"
            primaryTypographyProps={{ fontSize: 13, fontWeight: 'medium', lineHeight: '20px', mb: '2px' }}
            sx={{ my: 0 }}
          />
        </ListItem>
      )}
      <Divider />
      <ListItem
        button
        onClick={() => {
          setMenuItemSelected('Logout');
          setOpenLogoutModal(true);
        }}
      >
        <ListItemIcon sx={{ py: 0, minHeight: 32 }}>
          <LogoutIcon sx={{ color: red[900] }} />
        </ListItemIcon>
        <ListItemText
          primary="Logout"
          primaryTypographyProps={{ fontSize: 13, fontWeight: 'medium', lineHeight: '20px', mb: '2px' }}
          sx={{ my: 0 }}
        />
      </ListItem>
    </List>
  );
};
