import React from 'react';

const UrlItem = (props) => {

  return (
    <li>
        <input
          index={props.index}
          type="url"
          value={props.url}
          onChange={props.onChange}
        />
    </li>)
}

export default UrlItem
