import React from 'react';
import { navigate } from "hookrouter";

import UrlItem from './UrlItem'
import SettingsHeading from './SettingsHeading'

class Settings extends React.Component{

  constructor(props){
    super(props);

		this.state = {id: undefined, cycletime: '', autoscroll: false, urlItems: []};

    this.handleChange = this.handleChange.bind(this);
		this.handleListChange = this.handleListChange.bind(this);
		this.save = this.save.bind(this);
  }

	handleChange(event) {
		let name = event.target.name;
		let value = event.target.value;

    this.setState({[name]: value});
  }

	handleListChange(event) {

		let urlItems = this.state.urlItems;

		urlItems[event.target.attributes[0].value] = event.target.value

		// Remove any empty items
		urlItems = urlItems.filter(function (el) {
        return el != '';
    });

    this.setState({urlItems: urlItems});
  }

  componentDidMount(){
		this.load();
  }

	toggleSettingsMenu(event) {
    event.preventDefault();

		if( document.body.classList.contains('settings-open') ) {
			document.body.classList.remove('settings-open');
      event.currentTarget.classList.remove('is-active');
		} else {
			document.body.classList.add('settings-open');
      event.currentTarget.classList.add('is-active')
		}
	}

	load() {
    let settings = JSON.parse(localStorage.getItem('settings'));

		if( null == settings || undefined == settings.urlItems ) {
      return;
    }

    this.setState(settings);
  }

	save() {
    // Temporary ID for now
		if (undefined === this.state.id ) {
			const d = new Date();
			this.state.id = d.getMilliseconds();
		}

    // Remove empty item before saving
		this.state.urlItems.pop();

		localStorage.setItem('settings', JSON.stringify(this.state));

		navigate('/' + this.state.id);
  }

	render(props, state) {
    // Add empty item for new URL if needed
		if ( 0 == this.state.urlItems.length || this.state.urlItems[this.state.urlItems.length-1].length > 0 ) {
			this.state.urlItems.push('');
		}

    return (
      <div className="settings sidenav">
        <button className="hamburger hamburger--arrow menu" type="button" onClick={this.toggleSettingsMenu}>
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
				<SettingsHeading />
	      <form>
	        <label htmlFor="cycletime">Cycle time</label>
	        <input type="number" id="cycletime" name="cycletime" min="1000" max="18000000" value={this.state.cycletime} onChange={this.handleChange} />

					<label>URLs</label>
	        <ul className="url-list">
						{ this.state.urlItems.map( (urlItem, index) => (
							<UrlItem
	  					 	key={index}
								index={index}
	              url={urlItem}
								onChange={this.handleListChange}
							/>
						)) }
					</ul>

	        <button type="button" onClick={this.save}>Save</button>
	      </form>
    	</div>
    )
  }
}

export default Settings
