import AutomobileType from "../types/AutomobileType";
import BusinessType from "../types/BusinessType";
import ServiceType from "../types/ServiceType";
import * as actionTypes from "./actionTypes";

export interface Action {
  type:
    | actionTypes.BusinessActionType.UPDATE
    | actionTypes.BusinessActionType.SET
    | actionTypes.ServiceActionTypes.SET
    | actionTypes.ServiceActionTypes.REMOVE
    | actionTypes.ServiceActionTypes.UPDATE
    | actionTypes.AutomobileActionTypes.ADD_AUTOMOBILE
    | actionTypes.AutomobileActionTypes.UPDATE_AUTOMOBILE
    | actionTypes.AutomobileActionTypes.REMOVE_AUTOMOBILE
    | actionTypes.ServiceActionTypes.ADD
    | null;
  payload: BusinessType | ServiceType | AutomobileType | null;
}

export const setBusiness = (payload: BusinessType) => {
  return {
    type: actionTypes.BusinessActionType.SET,
    payload: payload,
  };
};

export const updateBusiness = (payload: BusinessType) => {
  return {
    type: actionTypes.BusinessActionType.UPDATE,
    payload: payload,
  };
};

export const deleteService = (payload?: ServiceType) => {
  return {
    type: actionTypes.ServiceActionTypes.REMOVE,
    payload: payload,
  };
};

export const updateService = (payload?: ServiceType) => {
  return {
    type: actionTypes.ServiceActionTypes.UPDATE,
    payload: payload,
  };
};

export const addService = (payload?: ServiceType) => {
  return {
    type: actionTypes.ServiceActionTypes.ADD,
    payload: payload,
  };
};

export const addAutomobile = (payload: AutomobileType) => {
  return {
    type: actionTypes.AutomobileActionTypes.ADD_AUTOMOBILE,
    payload: payload,
  };
};

export const updateAutomobile = (payload: AutomobileType) => {
  return {
    type: actionTypes.AutomobileActionTypes.UPDATE_AUTOMOBILE,
    payload: payload,
  };
};

export const deleteAutomobile = (payload: AutomobileType) => {
  return {
    type: actionTypes.AutomobileActionTypes.REMOVE_AUTOMOBILE,
    payload: payload,
  };
};
