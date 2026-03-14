import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
<<<<<<< HEAD
import App from './App'
import { ToastProvider } from './context/ToastContext' 
=======
import App from './App.jsx'
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
      <ToastProvider>         
        <App />
      </ToastProvider>          
    </BrowserRouter>
  </React.StrictMode>
=======
      <App />
    </BrowserRouter>
  </React.StrictMode>,
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
)