import React, { useState, useEffect } from 'react';

const TestIFrame = () => {
  const items = [...Array(100).keys()];
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div>
    <p><b>Running for: {seconds} seconds</b></p>
    { items.map( (item) => (
      <p key={item}>{item}</p>
    )) }
    </div>)
}

export default TestIFrame;
