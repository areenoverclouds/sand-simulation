import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <div style={{ textAlign: 'center', margin: '5px' }}> SAND SIMULATOR: drag mouse to drop sand </div>
    <App />
  </>,
)
