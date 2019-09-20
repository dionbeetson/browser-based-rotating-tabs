import React from 'react';

const TestIFrame = () => {
  const items = [...Array(100).keys()];

  return (
    <div>
    { items.map( (item) => (
      <p key={item}>{item}</p>
    )) }
    </div>)
}

export default TestIFrame;
