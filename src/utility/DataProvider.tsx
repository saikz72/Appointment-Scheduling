import { Action } from './action';
import React from 'react';
import BusinessType from '../types/BusinessType';
import * as actionTypes from './actionTypes';
import ServiceType from '../types/ServiceType';
import { getAllServices } from '../services/OfferingService';
import { getBusinessInfo } from '../services/BusinessService';
import AutomobileType from '../types/AutomobileType';
import { getAutomobilesFromServer } from '../services/AutomobileService';
import { usePersist } from './PersistenceProvider';
import { useAuth } from './AuthProvider';

interface StateType {
  business: BusinessType | null;
  services: any;
  automobiles: any;
}

const initialState: StateType = {
  business: null,
  services: [],
  automobiles: [],
};

interface ReducerType {
  business: BusinessType | null;
  services: ServiceType[] | null;
  automobiles: AutomobileType[] | null;
}

const reducer = (state: StateType, action: Action): ReducerType => {
  const { type, payload } = action;
  let index: number = -1;
  switch (type) {
    case actionTypes.ServiceActionTypes.SET:
      return {
        ...state,
        services: [...state.services, payload],
      };
    case actionTypes.BusinessActionType.UPDATE:
      return {
        ...state,
        business: payload,
      };
    case actionTypes.BusinessActionType.SET:
      return {
        ...state,
        business: payload,
      };
    case actionTypes.ServiceActionTypes.REMOVE:
      //logic for removing items in basket
      let newServices = [...state.services];
      index = state.services.findIndex((service: ServiceType) => service._id === payload?._id);
      if (index >= 0) {
        //item exist, remove it
        newServices.splice(index, 1);
      } else {
        //item does not exist
        console.warn(`Can't remove (id : ${payload}) as it doesn't exist`);
      }
      return { ...state, services: newServices };
    case actionTypes.ServiceActionTypes.UPDATE:
      index = state.services.findIndex((service: ServiceType) => service._id === payload?._id);
      if (index >= 0) {
        state.services[index] = payload;
      } else {
        //item does not exist
        console.warn(`Can't remove (id : ${payload}) as it doesn't exist`);
      }
      return {
        ...state,
        services: state.services,
      };
    case actionTypes.AutomobileActionTypes.ADD_AUTOMOBILE:
      return {
        ...state,
        automobiles: [...state.automobiles, payload],
      };
    case actionTypes.AutomobileActionTypes.UPDATE_AUTOMOBILE:
      index = state.automobiles.findIndex((automobile: AutomobileType) => automobile._id === payload?._id);
      if (index >= 0) {
        state.automobiles[index] = payload;
      } else {
        console.warn(`Can't remove (id : ${payload}) as it doesn't exist`);
      }
      return {
        ...state,
        automobiles: state.automobiles,
      };

    case actionTypes.AutomobileActionTypes.REMOVE_AUTOMOBILE:
      let newAutomobiles = [...state.automobiles];
      index = state.automobiles.findIndex((automobile: AutomobileType) => automobile._id === payload?._id);
      if (index >= 0) {
        newAutomobiles.splice(index, 1);
      } else {
        console.warn(`Can't remove (id : ${payload}) as it doesn't exist`);
      }
      return { ...state, automobiles: newAutomobiles };
    default:
      return state;
  }
};

const DataContext = React.createContext<{ state: StateType; dispatch: React.Dispatch<any> }>({
  state: initialState,
  dispatch: () => null,
});

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const persist = usePersist();
  const auth = useAuth();
  const user = auth.user ? auth.user : persist.user;

  React.useEffect(() => {
    getAllServices().then((result) => {
      result?.data.forEach((service: ServiceType) => initialState.services.push(service));
    });
    getBusinessInfo().then((business: BusinessType) => {
      initialState.business = business;
    });

    getAutomobilesFromServer(user?._id).then((res: any) => {
      console.log(res);
      initialState.automobiles = res;
    });
  }, [user?._id]);

  const [state, dispatch] = React.useReducer(reducer, initialState);
  return <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>;
};

export const useData = () => {
  return React.useContext(DataContext);
};

export default DataProvider;
