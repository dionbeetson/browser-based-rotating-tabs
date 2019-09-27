import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { navigate } from "hookrouter";

import { StateContext, useStateValue, InitialState } from './../state/State.js';

import UrlItem from './UrlItem'
import SettingsHeading from './SettingsHeading'

const Settings = (id) => {

  const state = useStateValue();
  let dirty = false;
  let dirtyRef = useRef(dirty);

  const getApiURL = () => {
    let apiUrl = window.location.protocol + '//api.' + window.location.hostname.replace('www.', '') + ('' == window.location.port ? '' : ':1235') + '/settings/';
    return apiUrl;
  }

  const updateInput = (event) => {
		let name = event.target.name;
		let value = event.target.value;

    state.data.settings[name] = value;
    dirtyRef.current = true;
    state.updateState(state.data.settings);
  }

	const updateUrlItem = (event) => {
		let urlItems = state.data.settings.urlItems;

		urlItems[event.target.attributes[0].value] = event.target.value

		// Remove any empty items
		urlItems = urlItems.filter(function (el) {
        return el != '';
    });

    urlItems.push('');

    state.data.settings.urlItems = urlItems;
    dirtyRef.current = true;
    state.updateState(state.data.settings);
  }

  const toggleSettingsMenu = (event) => {
    event.preventDefault();

		if( document.body.classList.contains('settings-open') ) {
			document.body.classList.remove('settings-open');
      event.currentTarget.classList.remove('is-active');
		} else {
			document.body.classList.add('settings-open');
      event.currentTarget.classList.add('is-active')
		}
	}

  useEffect(() => {
    load();
  }, []);

  const loadLocal = () => {
    let settings = JSON.parse(localStorage.getItem('settings'));

    if( null == settings || undefined == settings.urlItems ) {
      return null;
    }

    if( settings.urlItems.length > 0 && settings.urlItems[settings.urlItems.length-1] != "" ) {
      settings.urlItems.push('');
    }

    return settings;
  }

  const loadRemote = () => {
    if( undefined !== id.id ) {
      axios.get(getApiURL() + id.id)
      .then(function (response) {
        let settings = JSON.parse(response.data);

        if( null == settings || undefined == settings.urlItems ) {
          return;
        }

        if( settings.urlItems.length > 0 && settings.urlItems[settings.urlItems.length-1] != "" ) {
          settings.urlItems.push('');
        }

        settings.savedRemotely = true;
        dirtyRef.current = false;

        // Save local
    		localStorage.setItem('settings', JSON.stringify(settings));

        state.updateState({...settings});
      })
      .catch(function (error) {
        console.log('Error loading remote', error)
      })
      .finally(function () {
      });
    }
  }

  const load = () => {
    let settings = null;
    const refreshTimer = 30000;

    if ( dirtyRef.current ) {
      setTimeout(load, refreshTimer);
      return;
    }

    settings = loadLocal();

    if( null !== settings ) {
      settings.savedRemotely = true;
      dirtyRef.current = false;

      state.updateState({...settings});
    }

    loadRemote();

    setTimeout(load, refreshTimer);
  }

	const save = () => {
		if ('' === state.data.settings.id ) {
			const d = new Date();
			state.data.settings.id = d.getMilliseconds() + '';
		}

    let settings = {...state.data.settings};

    // Remove empty item before saving
		settings.urlItems.pop();

    // Save local
		localStorage.setItem('settings', JSON.stringify(settings));

    // Save remotely
    settings.cycletime = settings.cycletime.toString();
    settings.refreshtime = settings.refreshtime.toString();

    if( false == settings.savedRemotely ) {
      axios.post(getApiURL(), settings)
      .then(function (response) {
        settings.savedRemotely = true;
        localStorage.setItem('settings', JSON.stringify(settings));
        dirtyRef.current = false;
      });
    } else {
      axios.put(getApiURL() + settings.id, settings)
      .then(function (response) {
        dirtyRef.current = false;
      });
    }

    settings.urlItems.push('');

    state.updateState({...settings});
  }

  const startover = () => {
    localStorage.removeItem('settings');
    state.data.settings = InitialState.settings
    state.updateState({...state.data.settings});
    navigate('/');
  }

  return (

  <StateContext.Consumer>
    {context => (
      <div className="settings sidenav">
        <button className="hamburger hamburger--arrow menu" type="button" onClick={toggleSettingsMenu}>
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
  			<SettingsHeading />

        <form>
          <label htmlFor="id">Name</label>
          <input type="text" id="id" name="id" value={context.data.settings.id} onChange={updateInput} />

          <label htmlFor="cycletime">Cycle time</label>
          <input type="number" id="cycletime" name="cycletime" min="0" max="500" value={context.data.settings.cycletime} onChange={updateInput} />

          <label htmlFor="refreshtime">Refresh time</label>
          <input type="number" id="refreshtime" name="refreshtime" min="0" max="3600" value={context.data.settings.refreshtime} onChange={updateInput} />

         <label>URLs</label>
         <ul className="url-list">
           { context.data.settings.urlItems.map( (urlItem, index) => (
             <UrlItem
               key={index}
               index={index}
               url={urlItem}
               onChange={updateUrlItem}
             />
           )) }
         </ul>

         <button type="button" onClick={save}>Save</button>
         <button type="button" onClick={startover}>Start over</button>
        </form>
    	</div>
    )}
  </StateContext.Consumer>);
}

export default Settings
