import React, { useContext, useReducer, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Login from './Login';
// import Register from './Register';
// import FetchExample from './FetchExample';
// import ContextAndReducerExample from './ContextAndReducerExample';
import * as serviceWorker from './serviceWorker';

import axios from 'axios';

import TodosContext from './context';
import todosReducer from './reducer';

import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

// Each hook must start with use
const useAPI = endpoint => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  }

  return data;
};


const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState);

  const savedTodos = useAPI('https://hooks-api.jsvanegas.now.sh/todos');

  useEffect(() => {
    dispatch({
      type: 'GET_TODOS',
      payload: savedTodos
    })
  }, [savedTodos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  );
};




ReactDOM.render(<App />, document.getElementById('root'));



// Example of how to use useContext and useReducer hooks
//
// export const UserContext = React.createContext();
// const userName = 'Juan';
// ReactDOM.render(
//   <UserContext.Provider value={userName}>
//     <ContextAndReducerExample />
//   </UserContext.Provider>
//   , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
