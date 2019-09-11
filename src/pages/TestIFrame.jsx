import React from 'react';

class TestIFrame extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    const items = [...Array(100).keys()];
    return (
      <div>
      { items.map( (item) => (
        <p key={item}>{item}</p>
      )) }

      </div>)
  }
}

export default TestIFrame;
