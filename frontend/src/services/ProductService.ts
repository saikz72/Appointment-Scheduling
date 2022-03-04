import { api } from "../utility/AuthProvider";
import { baseURL } from "../utility/constants";

export const getAllProductsFromServer = async () => {
  try {
    const response = await api.get(baseURL + "/product");
    return response;
  } catch (error) {
    console.log(error);
  }
};
