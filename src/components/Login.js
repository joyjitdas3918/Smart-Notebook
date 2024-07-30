import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = (props) => {
    
    let navigate = useNavigate();
useEffect(() => {
    if(localStorage.getItem('token')){
        navigate('/')
    }

    // eslint-disable-next-line
}, [])
    const [credentials, setCredentials] = useState({email: "", password: ""}) 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        //console.log(json);
        if (json.authtoken){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            
            props.showAlert("Succesfully logged in","success");
            navigate("/");

        }
        else{
            props.showAlert("Sorry you have entered invalid credentials","danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container my-3">
        <h2>Login</h2>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-success">Login</button>
                <Link className="btn btn-primary mx-2"  to="/signup" role="button">Create an account</Link>
            </form>
        </div>
                

  )
}

export default Login