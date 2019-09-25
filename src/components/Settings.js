import React, { useEffect, useRef } from 'react';
import axios from 'axios';

import { StateContext, useStateValue, InitialState } from './../state/State.js';

import UrlItem from './UrlItem'
import SettingsHeading from './SettingsHeading'

const Settings = (id) => {

  const state = useStateValue();
  let dirty = false;
  let dirtyRef = useRef(dirty);

  const getApiURL = () => {
    let apiUrl = window.location.protocol + '//api.' + window.location.hostname + ('' == window.location.port ? '' : ':1235') + '/settings/';
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

  const load = () => {
    let settings = null;
    const refreshTimer = 30000;

    if ( dirtyRef.current ) {
      setTimeout(load, refreshTimer);
      return;
    }

    axios.get(getApiURL() + id.id)
    .then(function (response) {
      settings = JSON.parse(response.data);
    })
    .catch(function (error) {
    })
    .finally(function () {
      if( null == settings || undefined == settings.urlItems ) {
        settings = JSON.parse(localStorage.getItem('settings'));
      }

      if( null == settings || undefined == settings.urlItems ) {
        return;
      }

      if( settings.urlItems.length > 0 && settings.urlItems[settings.urlItems.length-1] != "" ) {
        settings.urlItems.push('');
      }

      settings.dirty = false;
      dirtyRef.current = false;

      state.updateState({...settings});
    });

    setTimeout(load, refreshTimer);
  }

	const save = () => {
		if (null === state.data.settings.id ) {
			const d = new Date();
			state.data.settings.id = d.getMilliseconds();
		}

    let settings = {...state.data.settings};

    // Remove empty item before saving
		settings.urlItems.pop();

    // Save local
		localStorage.setItem('settings', JSON.stringify(settings));

    // Save remotely
    if( false == settings.savedRemotely ) {
      axios.post(getApiURL(), settings)
      .then(function (response) {
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
