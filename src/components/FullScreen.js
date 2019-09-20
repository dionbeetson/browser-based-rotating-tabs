import React from 'react';

const FullScreen = () => {

  const requestFullscreen = (ele) => {
  	if (ele.requestFullscreen) {
  		ele.requestFullscreen();
  	} else if (ele.webkitRequestFullscreen) {
  		ele.webkitRequestFullscreen();
  	} else if (ele.mozRequestFullScreen) {
  		ele.mozRequestFullScreen();
  	} else if (ele.msRequestFullscreen) {
  		ele.msRequestFullscreen();
  	} else {
  		console.log('Fullscreen API is not supported.');
  	}
  };

  const exitFullscreen = () => {
  	if (document.exitFullscreen) {
  		document.exitFullscreen();
  	} else if (document.webkitExitFullscreen) {
  		document.webkitExitFullscreen();
  	} else if (document.mozCancelFullScreen) {
  		document.mozCancelFullScreen();
  	} else if (document.msExitFullscreen) {
  		document.msExitFullscreen();
  	} else {
  		console.log('Fullscreen API is not supported.');
  	}
  };

	const goFullScreen = (event) => {
    if( null == document.fullscreenElement ) {
      requestFullscreen(document.documentElement);
    } else {
      exitFullscreen();
    }
  }

  return (<div className="fullscreen" onClick={goFullScreen}></div>)
}

export default FullScreen
