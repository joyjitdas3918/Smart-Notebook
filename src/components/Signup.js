import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = (props) => {
    let navigate = useNavigate();
useEffect(() => {
    if(localStorage.getItem('token')){
        navigate('/')
    }

    // eslint-disable-next-line
}, [])
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""}) 
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password,cpassword}=credentials;
        if(name.length===0 || password.length==0){
            props.showAlert("Enter all fields","danger");
        }
        else{
            if(cpassword!==password){
                props.showAlert("Password doesn't match confirmed password","danger");
            }
        else{
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        //console.log(json);
        
            if (json.authtoken){
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken); 
                navigate("/");
                props.showAlert("Sucessfully signed up","success");
    
            }
            else{
                props.showAlert("Sorry email already exists","danger");
            }
        }
    }
        
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container my-3">
        <h2>Signup</h2>
            <form  onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" />
                </div>

                <button type="submit" className="btn btn-success">Signup</button>
                <Link className="btn btn-primary mx-2"  to="/login" role="button">Already have an account</Link>
            </form>
        </div>
                

  )
}

export default Signup