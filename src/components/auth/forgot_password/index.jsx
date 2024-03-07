import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import andromedia from '../../../assets/andromedia.png'
import preview2 from '../../../assets/images/about/login_preview.png'
import preview5 from '../../../assets/images/about/preview5.png'
import { setForgotPasswordStep } from '../../../store/reducers/auth_reducer'
import ForgotPassword from './ForgotPassword'
import ForgotPasswordEmail from './ForgotPasswordEmail'
import ForgotPasswordVerification from './ForgotPasswordVerification'

const ForgotPasswordMain = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const forgotPasswordStep = useSelector(
    (state) => state.auth.forgotPasswordStep
  )

  const pageComponents = [
    ForgotPasswordEmail,
    ForgotPasswordVerification,
    ForgotPassword,
  ]
  const Page = pageComponents[forgotPasswordStep]

  const handleNext = (page) => {
    dispatch(setForgotPasswordStep(page))
  }

  const handleClose = () => {
    handleNext(0)
  }

  return (
    <div className="h-[100vh] w-full bg-white flex relative">
      <div
        onClick={() => navigate('/')}
        className="hidden md:flex items-center cursor-pointer fixed top-1 left-3"
      >
        <div className="w-16 h-16">
          <img src={andromedia} />
        </div>
      </div>
      <Page handleNext={handleNext} handleClose={handleClose} />

      <img
        src={preview5}
        alt=""
        className="fixed -top-20 -right-16 -z-10 md:z-0 h-[25rem]"
      />
      <img
        src={preview2}
        alt=""
        className="fixed -bottom-28 -left-16 -z-10 md:z-0 h-[25rem]"
      />
    </div>
  )
}

export default ForgotPasswordMain
