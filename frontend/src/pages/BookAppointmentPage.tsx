import Navbar from '../components/Navbar';
import { useAuth } from '../utility/AuthProvider';

export default function BookAppointmentPage() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <Navbar />
    </div>
  );
}
