import React, { useContext } from 'react';
import TodosContext from '../context';

export default function () {

  const { state, dispatch } = useContext(TodosContext);

  const title = state.todos.length > 0
    ? `${state.todos.length} Todos`
    : 'Nothing To Do!';

  return (
    <div className="container mx-auto mx-w-md text-center font-mono">
      <h1>{title}</h1>
      <ul className="list-reset p-0">
        {
          state.todos.map(todo =>
            (
              <li key={todo.id} className="flex border-black border-dashed border-2 my-2 py-4 items-center">
                <span
                  className={`cursor-pointer flex-1 ml-12 ${todo.complete && 'line-through text-grey-darkest'}`}
                  onDoubleClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo })}
                >
                  {todo.text}
                </span>
                <button onClick={() => dispatch({ type: 'SET_CURRENT_TODO', payload: todo })}>
                  <img
                    src="https://icon.now.sh/edit/0050c5"
                    alt="Edit Icon"
                    className="h-6"
                  />
                </button>
                <button onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo })}>
                  <img
                    src="https://icon.now.sh/delete/8b0000"
                    alt="Delete Icon"
                    className="h-6"
                  />
                </button>
              </li>
            )
          )
        }
      </ul>
    </div>
  );

}