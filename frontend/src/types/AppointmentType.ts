import AutomobileType from "./AutomobileType";
import CustomerType from "./CustomerType";
import ServiceType from "./ServiceType";

interface AppointmentType {
  _id?: string;
  startDate: Date;
  endDate: Date;
  service: ServiceType;
  customer: CustomerType;
  technician: any;
  noShow: boolean;
  bill: any;
  automobile: AutomobileType;
  status: string;
}

export default AppointmentType;
