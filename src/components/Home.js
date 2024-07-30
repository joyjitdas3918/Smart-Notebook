//import React, { useContext } from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";
const Home = (props) => {
  
  return (
    <div>
      <AddNote showAlert={props.showAlert}/>
      <Notes showAlert={props.showAlert}/>
    </div>
  );
};

export default Home;