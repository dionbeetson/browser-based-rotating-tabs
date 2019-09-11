import React from 'react';

class FullScreen extends React.Component{

  constructor(props){
    super(props);
		this.goFullScreen = this.goFullScreen.bind(this);
  }

  requestFullscreen(ele) {
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

  exitFullscreen() {
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

	goFullScreen(event) {
    if( null == document.fullscreenElement ) {
      this.requestFullscreen(document.documentElement);
    } else {
      this.exitFullscreen();
    }
  }

	render(props, state) {
    return (
      <div className="fullscreen" onClick={this.goFullScreen}></div>
    )
  }
}

export default FullScreen
