//import React, { useContext, useEffect } from 'react'
//import noteContext from '../notes/NoteContext'

import { Link } from "react-router-dom"

const About = () => {
  /*const a=useContext(noteContext)
  useEffect(()=>{
    a.update()
  }, [])*/
  return (
    <div>
      <div className="accordion mb-4" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        About Developer
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      
      <div className="accordion-body">
        
      <div className="row">
      <div className="d-flex justify-content-evenly">
        <div className="col-md-4">
      <div className="card my-3">
  <img src="https://media.licdn.com/dms/image/D5603AQFWolLxD-hVRQ/profile-displayphoto-shrink_800_800/0/1706511756689?e=1727913600&v=beta&t=fxfJBccuD2hItyYqbCjuStgAJMaMDDCUsO1q3-3QdBg" className="card-img-top" alt="Joyjit Das"/>
  <div className="card-body">
    <h5 className="card-title">Joyjit Das</h5>
    <p className="card-text">I am a MERN stack developer. Check out my Linkedin Profile</p>
    <div className="d-flex justify-content-evenly">
    <Link to="https://www.linkedin.com/in/joyjit-das-a380a1207/?originalSubdomain=in" className="btn btn-primary mx-2">LinkedIn Profile</Link>
    <Link to="https://github.com/joyjitdas3918" className="btn btn-primary mx-2">Github Profile</Link>
    </div>
  </div>
</div>
</div>


</div>

              </div>
              </div>
    </div>
  </div>
  {!localStorage.getItem('token')?<div className="d-flex justify-content-between">
  <Link className="btn btn-primary my-2 mx-2"  to="/signup" role="button">Create an account</Link>
  <Link className="btn btn-primary my-2 mx-2"  to="/login" role="button">Already have an account</Link>
  </div>:<></>}
    </div>
  </div>
  )
}

export default About