import { Action } from './action';
import React from 'react';
import BusinessType from '../types/BusinessType';
import * as actionTypes from './actionTypes';

interface StateType {
  business: BusinessType | null;
}

const initialState: StateType = {
  business: null,
};

const reducer = (state: StateType, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.BusinessActionType.UPDATE:
    case actionTypes.BusinessActionType.SET:
      return {
        ...state,
        business: payload,
      };
    default:
      return state;
  }
};

const DataContext = React.createContext<{ state: StateType; dispatch: React.Dispatch<any> }>({
  state: initialState,
  dispatch: () => null,
});

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>;
};

export const useData = () => {
  return React.useContext(DataContext);
};

export default DataProvider;
