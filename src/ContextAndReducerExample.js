import React, { useContext, useReducer } from 'react';
import { UserContext } from './index';

const initialState = {
  count: 0
};

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        count: state.count - 1
      }
    case 'RESET':
    default:
      return initialState;
  }
}

export default function () {
  const value = useContext(UserContext); // This way we can access to the context without the tags syntax
  console.log(value);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      Count: {state.count}
      <br />
      <button className="border m-1 p-1" onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button className="border m-1 p-1" onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
      <button className="border m-1 p-1" onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}



// Previous version of React Context without hooks
// export default function () {
//   return (
//     <UserContext.Consumer>
//       {
//         (value) => (
//           <div>{`Hello ${value}`}</div>
//         )
//       }
//     </UserContext.Consumer>
//   );
// }