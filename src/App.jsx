import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import router from './router'

function App() {
  return (
    <>
      {/* <BrowserRouter>
        <MainVideoPage />
      </BrowserRouter> */}

      <ToastContainer />
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
  )
}

export default App
