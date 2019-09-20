import React, { useEffect } from 'react';

import { StateContext, useStateValue } from './../state/State.js';

import UrlItem from './UrlItem'
import SettingsHeading from './SettingsHeading'

const Settings = () => {

  const state = useStateValue();

  const updateInput = (event) => {
		let name = event.target.name;
		let value = event.target.value;

    state.data.settings[name] = value;
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
    let settings = JSON.parse(localStorage.getItem('settings'));

		if( null == settings || undefined == settings.urlItems ) {
      return;
    }

    settings.urlItems.push('');

    state.updateState({...settings});
  }

	const save = () => {
    // Temporary ID for now
		if (null === state.data.settings.id ) {
			const d = new Date();
			state.data.settings.id = d.getMilliseconds();
		}

    let settings = {...state.data.settings};

    // Remove empty item before saving
		settings.urlItems.pop();

		localStorage.setItem('settings', JSON.stringify(settings));

    settings.urlItems.push('');

    state.updateState({...settings});
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
        </form>
    	</div>
    )}
  </StateContext.Consumer>);
}

export default Settings
