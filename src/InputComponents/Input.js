// module imports
import React from 'react';

// style imports
import './Input.scss';

// component 
// takes input and sends it back to the App where it's updated in the state and fed back through
const Input = (props) => {
  return (
    <input 
        className="value-box"
        name={props.name}
        type="number"
        value={props.inputValue}
        onChange={props.onChange}
        ref={props.inputRef}
    />
  );
}

export default Input;