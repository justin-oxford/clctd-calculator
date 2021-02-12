// module imports
import React, {useState, useRef} from 'react';

// component imports
import Input from './InputComponents/Input';
import Output from './OutputComponents/Output';

// style imports
import './App.scss';

// initial state, in this case it's just saved here, could be external (api)
const initialState = {
  input1Value: "",          // default value of first input
  input2Value: "",          // default value of second input
  calculatedValue: 0,       // default value of calculation
}

// component 
const App = () => {
  const [state, updateState] = useState(initialState);
  const inputRef = React.useRef();
  const clearRef = React.useRef();

  // get the input change event, check its value, and update the state object
  const handleChange = (event) => {
    const val = event.target.value !== '' ? parseInt(event.target.value) : "";
    updateState(prevState => {
      return { ...prevState, [event.target.name]: val }  // event.target.name should match a state value (i.e. input1Value...)
    });
  }


  // Check the inputs, if they are both blank strings (i.e. empty or just cleared) return true
  const checkInputState = () => {
    if (state.input1Value === "" && state.input2Value === "")
    {
      return true; // disabled is true
    }
    else
    {
      return false; // disabled is false
    }
  }

  // clears the screen by resetting to the default state
  // if the state comes from elsewhere (i.e. api, other components, it'll default to that initial state)
  // if clearing completely with no regard for external data, you could create the object in this function
  const clear = () => {
    updateState(initialState);
    inputRef.current.focus();  // focus on input after clearing
  }


  // adds the two numbers together, if it added two blank strings, it returns 0, otherwise it returns the value
  const calculate = () => {
    const result = state.input1Value + state.input2Value;
    updateState(prevState => {
      return { ...prevState, 
        calculatedValue: result !== "" ? result : 0
      }
    });
    clearRef.current.focus(); // after calculating, focus on clear, which when pressed will loop you back to input
  }
  
  // return FCN
  // has two inputs, an output, math symbols, and control buttons
  return (
    <div className="App">

      <div className="display-container">

        <Input
          name="input1Value"             // this should match the corresponding state value that goes into the inputValue (also, see handleChange)
          inputValue={state.input1Value} // this is state value that will update what renders in the input
          onChange={handleChange}        // the controller function
          inputRef={inputRef}              // whether or not to focus on this element when the re/focus is called (optional)
        />

        {/* just an element that holds the math symbol,
        if you want to expand to more inputs, this could move to the Input component */}
        <span className="math-symbol">+</span>

        <Input
          name="input2Value"             // this should match the corresponding state value that goes into the inputValue (also, see handleChange)
          inputValue={state.input2Value} // this is state value that will update what renders in the input
          onChange={handleChange}        // the controller function
        />

        {/* just an element that holds the math symbol */}
        <span className="math-symbol">=</span>

        {/* takes the state's calculated value and displays it */}
        <Output
          outputValue={state.calculatedValue}  // state's calculated result (either a value or 0)
        />

      </div>
      
      <div className="button-container">
        {/* didn't see the need to create a full button component in this case (mostly for time's sake), 
        if more complexity is desired (animation, etc) this be a quick change */}
        <button disabled={checkInputState()} onClick={calculate}>Add</button>
        <button disabled={checkInputState()} onClick={clear} ref={clearRef}>Clear</button>
      </div>

    </div>
  );
}

export default App;
