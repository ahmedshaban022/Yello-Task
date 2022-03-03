import axios from 'axios';
import e from 'cors';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Config from '../config'



const Register = () => {

let [user,setUser] = useState({});
const navigate = useNavigate()
const handleOnChange=({target})=>{
    setUser({...user,[target.name]:target.value});
    
}

const  handleOnSubmit= async (e)=>{
    e.preventDefault();
    if(user.password.length<6 || user.confirmPassword.length<6)
    {
        toast.warning("password must be 6 characters or more");
        return false
    }
    if(user.password === user.confirmPassword)
    {

        axios.post(`${Config.API}users/register`,{...user}).then((res)=>{
           
            toast.info(res.data.msg);
            if(res.data.msg=="Registeration Successfuly")
            {

                navigate('/login')
            }
  
        })
        .catch(err=>{
            console.log(err);
            toast.error("Somethin went wrong");
        }
            );
        
        
    }else{
        toast.error("Password dose not match wi Confirm password")
    }

}


    return (
        <div>
            <div className='container '>
                <h3 className='text-muted fw-bold m-5'>Register</h3>
                <form className=' w-50 m-auto mt-5 ' onSubmit={handleOnSubmit}>

    <div className="form-floating mb-3">
    <input
      type="text"
      className="form-control"
      id="floatingInput"
      placeholder="ahmed shaban"
      required
      name='username'
      onChange={handleOnChange}
      />
    <label htmlFor="floatingInput">UserName</label>
  </div>
        
  <div className="form-floating mb-3">
    <input
      type="email"
      className="form-control"
      id="floatingInput"
      placeholder="name@example.com"
      required
      name='email'
      onChange={handleOnChange}
      />
    <label htmlFor="floatingInput">Email address</label>
  </div>
  <div className="form-floating mb-3">
    <input
      type="password"
      className="form-control"
      id="floatingPassword"
      placeholder="Password"
      required
      name='password'
      onChange={handleOnChange}
      />
    <label htmlFor="floatingPassword">Password</label>
  </div>
  <div className="form-floating ">
    <input
      type="password"
      className="form-control"
      id="floatingPassword"
      placeholder="Password"
      required
      name='confirmPassword'
      onChange={handleOnChange}
      />
    <label htmlFor="floatingPassword">Confirm Password</label>
  </div>
        <div className='my-3  text-center'>
            <input type="submit" className='btn btn-outline-success  w-50' />
        </div>
      </form>


            </div>
        </div>
    );
}

export default Register;
