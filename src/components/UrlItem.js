import React from 'react';

class UrlItem extends React.Component{
  constructor(props){
    super(props);
  }

	render() {
		return (
			<li>
					<input
						index={this.props.index}
						type="url"
						value={this.props.url}
						onChange={this.props.onChange}
					/>
			</li>
		);
	}
}

export default UrlItem
