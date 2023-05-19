import { NavLink } from "react-router-dom"
import '../App.css'
import { LogoutComponent } from "./LogoutComponent"
import { LoginComponent } from "./LoginComponent"


export const NavbarComponent = () => {

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
       <ul 
       className="d-flex ml"
        style={{justifyContent:"space-around", alignItems:"center" }} 
        >

       <li className="nav-item" >
          <NavLink to="/" className={({isActive})=> (isActive ? 'text-info': '' )} >
          <span className="navbar-brand">
          <i className="fa fa-cart-plus" ></i>

           Articles &nbsp;
        </span>
          </NavLink>
       </li>

       <li className="nav-item"  >
          <NavLink  to='/order' className={({isActive})=> (isActive ? 'text-success': '' )} >
         
               <span  className="navbar-brand">
               <i className="fa fa-compass" ></i>
                      &nbsp;Orders
                  </span>
          </NavLink>
       </li>
      
         <li className="nav-item">
         <LogoutComponent/>
        
         </li>
       </ul>
    </div>
  )
}
