import React, { useEffect } from 'react';
import { navigate } from "hookrouter";

import { StateContext, useStateValue } from './../state/State.js';

import Settings from './../components/Settings'
import Content from './../components/Content'
import FullScreen from './../components/FullScreen'

const RotatingTab = ({id}) => {

  const state = useStateValue();

  useEffect(() => {
    let settings = JSON.parse(localStorage.getItem('settings'));
    if( null !== settings && id === undefined && settings.id.length > 0 ) {
      navigate('/' + settings.id);
    }
  }, []);

  useEffect(() => {
    if( (id == null && state.data.settings.id.length > 0) || (id != state.data.settings.id && state.data.settings.id.length > 0)) {
      navigate('/' + state.data.settings.id);
    }
  }, [state.data]);

  return (
    <div>
      <FullScreen  />
      <Settings id={id}/>
      <Content />
    </div>);
}

export default RotatingTab;
