import React, { useContext } from 'react';
import { userContext } from '../App';

const CompletedTasks = () => {
  const {myTodos,setTodos}=useContext(userContext);
  const completedTodos = myTodos.filter(todo => todo.isCompleted);

  return (
    <div  className='container mx-auto my-5 rounded-lg p-4 bg-blue-gray-100 min-h-screen'>
      <h1 className='font-bold my-2 text-center'>Completed Tasks</h1>
      {completedTodos.length > 0 ? (
        completedTodos.map(todo => (
          <div key={todo.id} className='mytodos flex my-3 justify-between mx-7'>
            <div>
              {todo.content}
            </div> 
          </div>
        ))
      ) : (
        <p>No completed tasks</p>
      )}
    </div>
  );
};

export default CompletedTasks;
