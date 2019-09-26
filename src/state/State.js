import React, {createContext, useContext, useState, useReducer} from 'react';

export const StateContext = createContext(null);

const initialState = {
  settings: {
    id: '',
    cycletime: 5,
    refreshtime: 60,
    urlItems: [
      location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '')+'/welcome',
      ''
    ],
    savedRemotely: false,
    dirty: false
  }
};

export const InitialState = initialState;

const provider = props => {
  const [state, setState] = useState(initialState);
  return (
    <StateContext.Provider
      value={{
        data: state,
        updateState: (settings) => {
          setState({ ...state, settings: settings});
        }
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export const StateProvider = provider;

export const useStateValue = () => useContext(StateContext);
