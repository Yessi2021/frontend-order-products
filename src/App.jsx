import { AppCover } from "./components/AppCover"
import { NavbarComponent } from "./components/NavbarComponent"
import {  BrowserRouter, Route, Routes } from "react-router-dom"
import { Order } from "./pages/Order"
import { useEffect } from "react"

import { ProfileComponent } from "./components/ProfileComponent"

import { useAuth0 } from "@auth0/auth0-react"
import { AppLogout } from "./components/AppLogout"


// SECRET_JWT_SEED=Esto-Es-UnA-Palb@_SecretA123457
function App() {

  const  { isAuthenticated, isLoading } = useAuth0()

  if ( isLoading ) return <h1>Loading...</h1>
    

  return (
    <>
      {
        isAuthenticated !== true ? ( <AppLogout/> ) : (  <BrowserRouter>
          <NavbarComponent/>
             <div className="container-fluid" >
            
             <ProfileComponent/>
             <Routes>
                 <Route path="/" element={<AppCover  /> }/>
                 <Route path="/order" element={<Order /> }/>
             </Routes>
           </div>
         </BrowserRouter>)
      }
    </>
  )
}

export default App
