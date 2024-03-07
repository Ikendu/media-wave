import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { useState } from 'react'

const InputComponent = ({
  type,
  placeholder,
  disabled,
  password,
  label,
  error,
  register,
  accept,
}) => {
  const [passwordType, setPasswordType] = useState(type)
  const passwordToggle = () => {
    if (passwordType === 'text') {
      return (
        <VisibilityOutlinedIcon
          className="text-gray-400 h-5 w-5 mx-2 cursor-pointer"
          onClick={() => setPasswordType('password')}
        />
      )
    } else if (passwordType === 'password') {
      return (
        <VisibilityOffOutlinedIcon
          className="text-gray-400 h-5 w-5 mx-2 cursor-pointer"
          onClick={() => setPasswordType('text')}
        />
      )
    } else return null
  }

  return (
    <div className="grid gap-1">
      <p className="text-gray-800 font-medium text-sm">{label}</p>
      <div className="grid gap-1">
        <div
          className={
            error
              ? 'relative flex items-center bg-transparent border border-red-600 rounded-sm mb-4'
              : 'relative flex items-center bg-transparent border rounded-sm mb-4'
          }
        >
          <input
            className="w-full py-3 px-3 border-none outline-none bg-inherit rounded-sm no-number-arrows"
            type={passwordType}
            placeholder={placeholder}
            {...register}
            disabled={disabled}
            accept={accept}
          />
          {password && passwordToggle()}
        </div>
      </div>
    </div>
  )
}

export default InputComponent
