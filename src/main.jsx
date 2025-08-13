import  React, {Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Suspense>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </Suspense>
  // </React.StrictMode>
)
