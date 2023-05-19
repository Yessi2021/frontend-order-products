
import '../App.css'
import { useAuth0 } from "@auth0/auth0-react"

export const LogoutComponent = () => {

const { logout } = useAuth0()

  return (
    <div className="container-l" >
       <p
        onClick={()=> logout() }
        className="text"
       >
        Logout
       </p>
    </div>
  )
}
