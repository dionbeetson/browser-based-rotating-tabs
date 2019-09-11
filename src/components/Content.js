import React from 'react';

class Content extends React.Component{

  constructor(props){
    super(props);

    this.state = {rotateInterval: undefined, urlItems: []};
    this.tabClick = this.tabClick.bind(this);
    this.activateTab = this.activateTab.bind(this);
    this.tabRotator = this.tabRotator.bind(this);
  }

  componentDidMount(){
    this.load();
  }

  getDomainFromURL(url) {
    let a = document.createElement('a');
    a.href = url;
    let hostname = a.hostname;
    hostname = hostname.replace('www.', '');
    return hostname;
  }

  load() {
    let urlItems = [];
    let settings = JSON.parse(localStorage.getItem('settings'));

    if( null == settings || undefined == settings.urlItems ) {
      this.tabRotator();
      this.activateTab(0);
      return;
    }

    for (var i = 0; i < settings.urlItems.length; i++) {
      if ( 'http' !== settings.urlItems[i].substring(0, 4) )
      {
        continue;
      }
      urlItems.push({
        name: this.getDomainFromURL(settings.urlItems[i]),
        url: settings.urlItems[i],
        active: false
      })
    }
    settings.urlItems = urlItems;

    this.setState(settings);

    setTimeout(() => {
      this.tabRotator();
      this.activateTab(0);
    }, 100);

  }

  activateTab(index) {
    if( 0 == this.state.urlItems.length ) {
      return;
    }

    for (var i = 0; i < this.state.urlItems.length; i++) {
      this.state.urlItems[i].active = false;
    }
    this.state.urlItems[index].active = true;

    let urlItems = this.state.urlItems;
    this.setState(urlItems: urlItems);
  };

  tabClick(index) {
    this.activateTab(index);
  }

  tabRotator() {
    clearInterval(this.state.rotateInterval);
    let cycleTime = parseInt(this.state.cycletime);

    if( isNaN(cycleTime) ) {
      cycleTime = 3000;
    }

    let urlItems = this.state.urlItems;

    // Cycle tab every x seconds
    this.state.rotateInterval = setInterval(() => {
      let itemIndex;
      let urlItems = this.state.urlItems;

      for (var i = 0; i < urlItems.length; i++) {
        if( urlItems[i].active ) {
          itemIndex = i+1;
        }
      }

      if( undefined == itemIndex || itemIndex > (urlItems.length-1)) {
        itemIndex = 0;
      }

      this.activateTab(itemIndex);

    }, cycleTime);
  }

  render(props, state) {
    return (
      <div className="content">
        <div className="tabs">
          { this.state.urlItems.map( (urlItem, index) => (
            <div key={index} onClick={this.tabClick.bind(this,index)} className={(urlItem.active ? 'active' : '')}>{urlItem.name}</div>
          )
        )}
        </div>
        <div className="iframes">
          { this.state.urlItems.map( (urlItem, index) => (
            <iframe key={index} src={urlItem.url} id={'iframe'+index} className={(urlItem.active ? 'active' : '')}></iframe>
          ))}
        </div>
      </div>
    )
  }
}

export default Content
