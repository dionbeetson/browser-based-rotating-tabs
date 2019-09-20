import React, { useState, useEffect, useRef } from 'react';

import { StateContext, useStateValue } from './../state/State.js';

const Content = () => {

  const state = useStateValue();

  let rotateInterval = undefined;
  let rotateIntervalRef = useRef(rotateInterval);
  rotateIntervalRef.current = rotateInterval;

  const [settings, setSettings] = useState({urlItems:[]});
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    let stateSettings = {...state.data.settings};
    let urlItems = [];
    const currentActiveTabIndex = getCurrentActiveTabIndex();

    for (var i = 0; i < stateSettings.urlItems.length; i++) {
      if ( isValidUrl(stateSettings.urlItems[i]) ) {
        urlItems.push({
          name: getDomainFromURL(stateSettings.urlItems[i]),
          url: stateSettings.urlItems[i].substring(0),
          active: (currentActiveTabIndex == i ? true : false),
          lastRefreshed: Math.round((new Date()).getTime() / 1000)
        })
      }
    }

    stateSettings.urlItems = urlItems;

    setSettings({...stateSettings});

  }, [state.data]);

  const isValidUrl = (url) => {
    if ( 'http' == url.substring(0, 4) )
    {
      return true;
    }

    return false;
  }

  const getDomainFromURL = (url) => {
    let a = document.createElement('a');
    a.href = url;
    let hostname = a.hostname;
    hostname = hostname.replace('www.', '');
    return hostname;
  }

  const cleanArray = (urlItem) => {
    if ( 'http' == urlItem.url.substring(0, 4) )
    {
      return true;
    }

    return false;
  }

  const getCurrentActiveTabIndex = () => {
    for (var i = 0; i < settings.urlItems.length; i++) {
      if( settings.urlItems[i].active ) {
        return i;
      }
    }
    return 0
  }

  const activateTab = (index) => {
    let s = settingsRef.current;

    if( 0 == s.urlItems.length ) {
      return;
    }

    for (var i = 0; i < s.urlItems.length; i++) {
      s.urlItems[i].active = false;
    }
    s.urlItems[index].active = true;

    setSettings({...s});
  };

  const activateTabFromClick = (index) => {
    activateTab(index)
  }

  useEffect(() => {
    clearInterval(rotateIntervalRef.current);

    let cycleTime = parseInt(state.data.settings.cycletime);

    if( 0 == cycleTime ) {
      return;
    }

    if( isNaN(cycleTime) ) {
      return;
    }

    cycleTime = cycleTime * 1000;

    const interval = setInterval(() => {
      let itemIndex;
      let urlItems = settingsRef.current.urlItems;

      for (var i = 0; i < urlItems.length; i++) {
        if( urlItems[i].active ) {
          itemIndex = i+1;
        }
      }

      if ( undefined == itemIndex || itemIndex > (urlItems.length-1) ) {
        itemIndex = 0;
      }

      activateTab(itemIndex);
    }, cycleTime);
    return () => clearInterval(interval);
  }, [state.data]);

  return (
    <StateContext.Consumer>
    {context => (
      <div>
        <div className="content">
          <div className="tabs">
            { undefined !== settings.urlItems &&
             settings.urlItems.map( (urlItem, index) => (
                <div key={index} onClick={()=>activateTabFromClick(index)} className={(urlItem.active ? 'active' : '')}>{getDomainFromURL(urlItem.url)}</div>
              )
            )}
          </div>
          <div className="iframes">
          { undefined !== settings.urlItems &&
             settings.urlItems.map( (urlItem, index) => (
              <iframe key={index} src={urlItem.url} id={'iframe'+index} className={(urlItem.active ? 'active' : '')}></iframe>
            ))
            }
          </div>
        </div>
      </div>
    )}
  </StateContext.Consumer>
  );
}

export default Content
