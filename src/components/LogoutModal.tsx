import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAuth } from '../utility/AuthProvider';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function LogoutModal(props: any) {
  const { openLogoutModal, setOpenLogoutModal } = props;
  const handleClose = () => setOpenLogoutModal(false);
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <Modal
        open={openLogoutModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to sign out?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => {
                localStorage.setItem('isAuthenticated', 'NO');
                auth.signout(() => navigate('/'));
              }}
            >
              Yes
            </Button>
            <Button onClick={handleClose}>No</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
