import './App.css';
import Navbar1 from './Components/Navbar1';
import { useEffect, useState,createContext } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CompletedTasks from './Components/CompletedTasks';
import { v4 as uuidv4 } from 'uuid';
import Home from './Components/Home';
import Mytasks from './Components/Mytasks';
uuidv4();

const userContext=createContext();

function App() {
  
  const [myTodos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || []
  });

  

  const route=createBrowserRouter([
    {
      path:"/",
      element:<Navbar1 />
    },
    {
      path:"/completedtasks",
      element:<><Navbar1 /> <CompletedTasks todos={myTodos} /></>
    },
    {
      path:"/home",
      element:<><Navbar1 /> <Home  /></>
    } ,
    {
      path:"/mytasks",
      element:<><Navbar1/><Mytasks todos={myTodos}/></>
    }
    
  ])

  

  // useEffect(() => {
  //   try {
  //     let todoString = localStorage.getItem("todos");
  //     if (todoString) {
  //       let todos = JSON.parse(todoString);
  //       setTodos(todos);
  //     }
  //   } catch (error) {
  //     console.error("Error parsing JSON from localStorage:", error);
  //     setTodos([]);
  //   }
  // }, []);

  

  

  return (
    <>
    <userContext.Provider value={{myTodos, setTodos}}>
    <RouterProvider router={route}/>
    </userContext.Provider>
    
    </>
  );
}

export default App;
export {userContext}
