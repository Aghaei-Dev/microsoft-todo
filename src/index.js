import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/style/index.css'
import App from './App'
import { MicrosoftTodoProvider } from './context/context'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter as Router } from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Auth0Provider
    domain='dev-k3jcu6blnnrdmv3l.us.auth0.com'
    clientId='3UDUBB2gkqu6IZAitRnZqwiMBRRm1Lwl'
    redirectUri={window.location.origin}
    cacheLocation='localstorage'>
    <MicrosoftTodoProvider>
      <Router>
        <App />
      </Router>
    </MicrosoftTodoProvider>
  </Auth0Provider>
)
