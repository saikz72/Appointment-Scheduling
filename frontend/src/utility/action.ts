import BusinessType from '../types/BusinessType';
import * as actionTypes from './actionTypes';

export interface Action {
  type: actionTypes.BusinessActionType.UPDATE | actionTypes.BusinessActionType.SET | null;
  payload: BusinessType | null;
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
