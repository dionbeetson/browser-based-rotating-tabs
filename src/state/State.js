import React, {createContext, useContext, useState, useReducer} from 'react';

export const StateContext = createContext(null);

const provider = props => {
  const [state, setState] = useState({
      settings: {
        id: null,
        cycletime: 5,
        urlItems: [
          location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '')+'/testiframe',
          ''
        ]
      }
    });
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
