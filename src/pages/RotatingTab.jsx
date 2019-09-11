import React from 'react';

import Settings from './../components/Settings'
import Content from './../components/Content'
import FullScreen from './../components/FullScreen'

class RotatingTab extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <FullScreen />
        <Settings />
        <Content />
      </div>)
  }
}

export default RotatingTab;
