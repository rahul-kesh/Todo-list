import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import CompletedTasks from './CompletedTasks';
import { userContext } from '../App';
import { v4 as uuidv4 } from 'uuid';
uuidv4();


const Home = () => {
    const [content, setContent] = useState(""); // Initialize with an empty string
    const {myTodos,setTodos}=useContext(userContext);
    // const [myTodos, setTodos] = useState(() => {
    //   return JSON.parse(localStorage.getItem("todos")) || []
    // });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(myTodos));
      }, [myTodos]);
    
      const handleAdd = () => {
        setTodos([...myTodos, { id: uuidv4(), content, isCompleted: false }]);
        
        setContent("");
      };
    
      const handleChange = (e) => {
        setContent(e.target.value);
      };
    
      const handleEdit = (e, id) => {
        let etodo = myTodos.filter(i => i.id === id);
        setContent(etodo[0].content);
        let newTodo = myTodos.filter((item) => {
          return item.id !== id;
        });
        setTodos(newTodo);
      };
    
      const handleDelete = (e, id) => {
        let newTodo = myTodos.filter((item) => {
          return item.id !== id;
        });
        setTodos(newTodo);
      };
    
      const handleCheckbox = (e) => {
        let id = e.target.value;
        let index = myTodos.findIndex((items) => {
          return items.id === id;
        });
        let newMyTodos = [...myTodos];
        newMyTodos[index].isCompleted = !newMyTodos[index].isCompleted;
        setTodos(newMyTodos);
      };

  return (
    <>
      
      <div className='container mx-auto my-5 rounded-lg p-4 bg-blue-gray-100 min-h-screen'>
        <div className='addtodo'>
          <h1 className='font-bold'>Add Todo</h1>
          <input onChange={handleChange} type='text' value={content} /> 
          <button onClick={handleAdd} disabled={content.length<3} className='bg-indigo-400 px-2 m-6 text-white rounded-md'>Add</button>
        </div>

        <h1 className='font-bold my-2'>My Todos</h1>

        {myTodos.map((res) => {
          return (
            <div key={res.id} className='mytodos flex my-3 justify-between'>
            
              <div>
                <input type='checkbox' checked={res.isCompleted}  onChange={handleCheckbox} value={res.id} />
              </div>

              <div className={res.isCompleted ? "line-through" : ""}>
                {res.content}
              </div>

              <div className="buttons mx-8 flex h-full">
                <button onClick={(e) => { handleEdit(e, res.id) }} className='bg-indigo-400 px-2 py-1 m-1 text-white rounded-md hover:bg-light-blue-500'>Edit</button>
                <button onClick={(e) => { handleDelete(e, res.id) }} className='bg-indigo-400 px-2 py-1 m-1 text-white rounded-md hover:bg-red-700'>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default Home