import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from "@auth0/auth0-react"





const domainKey = import.meta.env.VITE_API_KEY_AUTH_DOMAIN
const clientKey = import.meta.env.VITE_API_KEY_AUTH_CLIENT_ID


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Auth0Provider 
   domain={ domainKey } 
   clientId={ clientKey } 
   authorizationParams={{
    redirect_uri: window.location.origin
  }} 
    >
       <App />
   </Auth0Provider>
  </React.StrictMode>,
)
