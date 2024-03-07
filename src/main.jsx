import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { SWRConfig } from 'swr'

import App from './App.jsx'
import init from './api/config.js'
import './index.css'
import store, { persistor } from './store/index.js'
import socketConnection from './utilities/socketConnection.js'

const fetcher = async (...args) => {
  const res = await axios(...args)
  return res.data
}

init()
socketConnection()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SWRConfig value={{ fetcher }}>
          <App />
        </SWRConfig>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
