import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AndroWhiteIcon from '../utils/icons/AndroWhiteIcon'

const Header = () => {
  const history = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const access_token = localStorage.getItem('access_token')

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSignout = () => {
    localStorage.clear()
    history('/')
    window.location.reload()
  }

  return (
    <header className="flex items-center justify-between w-full px-5 py-5  z-50 bg-[white]">
      <div
        onClick={() => history('/')}
        className="flex items-center cursor-pointer"
      >
        <AndroWhiteIcon color={'#3592FF'} />
        <p className="text-[#3592FF] font-semibold text-lg mb-4">ANDROMEDIA</p>
      </div>
      <div className="relative w-full h-full flex justify-between items-center">
        <button
          className="hidden absolute max-[768px]:inline text-2xl right-2 bottom-1rem text-[#17106B] cursor-pointer max-[768px]:text-xl"
          onClick={toggleDropdown}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
        {isOpen && (
          <div className=" w-48 bg-[#fff] rounded-md shadow-lg  top-10 right-2 h-72 z-10 absolute">
            <ul className="w-full h-full flex flex-col items-center justify-center gap-10">
              <li className="text-[#000] font-medium max-[600px]:text-base">
                <Link to="/pricing">Pricing</Link>
              </li>
              {access_token ? (
                <li className="text-[#000] font-medium max-[600px]:text-base">
                  <Link to="/dashboard">Dashboard</Link>{' '}
                </li>
              ) : (
                <li className="text-[#000] font-medium max-[600px]:text-base">
                  <Link to="/signin">Login</Link>{' '}
                </li>
              )}
              {access_token && (
                <li className="text-[#000] font-medium max-[600px]:text-base">
                  <Link to="/signup">Get Started</Link>
                </li>
              )}

              {access_token && (
                <li
                  onClick={handleSignout}
                  className="text-[#000] font-medium max-[600px]:text-base"
                >
                  <p>Sign out</p>
                </li>
              )}

              <p
                onClick={() => history('/company/setup')}
                className="cursor-pointer py-2 px-3 text-[#000] border-2 rounded-xl"
              >
                Free Demo
              </p>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
