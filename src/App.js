//import logo from './logo.svg';
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Alert from "./components/Alert";

  
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
      <Navbar/>
        <Alert alert={alert}/>
        <div className="container">
          <Home showAlert={showAlert}/>
        </div>
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
      <Navbar/>
        <Alert alert={alert}/>
        <div className="container">
          <About />
        </div>
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
      <Navbar/>
        <Alert alert={alert}/>
        <div className="container">
          <Login showAlert={showAlert}/>
        </div>
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
      <Navbar/>
        <Alert alert={alert}/>
        <div className="container">
          <Signup showAlert={showAlert}/>
        </div>
      </>
    ),
  },
]);
  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
    <div>
      
      <NoteState> 
        <RouterProvider router={router} />
      </NoteState>
    </div>
  );
}

export default App;