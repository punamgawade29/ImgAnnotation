
import React from 'react'
import logo from '../assets/logo.png'
import { Navigate, useNavigate } from 'react-router-dom'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
    const navigate=useNavigate()
  return (
   
    <div className='navbar'>
    <div className='logo' ><img src={logo}  alt="" width={200} height={200}></img>
    </div>
        
        <ul>
      <NavLink to='/' ><li> Home</li> </NavLink>
       <NavLink to ='/edit'><li>Editor</li> </NavLink>
       <NavLink to ='/edit'><li>Tools</li> </NavLink>
       <NavLink to ='/edit'><li>About</li> </NavLink>
        </ul>
        <button onClick={()=>navigate('/edit',{replace:true})}>Get Started</button>
    </div>
   
   
  )
}

export default Navbar