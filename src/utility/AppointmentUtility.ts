import { Service } from '../models/Service';

abstract class AppointmentUtility {
  static getTotalCostFromServices(allServices: Service[]): number {
    let cost: number = 0;
    allServices.forEach((service) => {
      cost += service.cost;
    });
    return cost;
  }
}

export default AppointmentUtility;
