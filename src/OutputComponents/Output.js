// module imports
import React from 'react';

// component -- very simple
const Output = (props) => {
  return (
    <div 
        className="value-box"
    >
      {props.outputValue}
    </div>
  );
}

export default Output;