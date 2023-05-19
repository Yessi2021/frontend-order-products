import { useAuth0 } from "@auth0/auth0-react"
import '../App.css'

export const LoginComponent = () => {

    const { loginWithRedirect } = useAuth0()

  return (
    <div>
       <div className="container-button">
         <button  
         className="centered-button"
          onClick={ ()=> loginWithRedirect() } >Click to login the system</button>
       </div>
    </div>
  )
}
