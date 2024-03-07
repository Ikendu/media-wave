import { yupResolver } from '@hookform/resolvers/yup'
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import Button from '../../../utils/reusables/Button'
import InputComponent from '../../../utils/reusables/InputComponent'

const schema = yup.object().shape({
  old_password: yup.string().required('Please enter old password'),
  new_password: yup.string().required('Please enter new password'),
})

const PasswordChange = ({ modalRef }) => {
  const [loading, setLoading] = useState(false)

  const {
    getValues,
    //setValue,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'all',
    reValidateMode: 'onSubmit',
    mode: 'onChange',
  })

  const onSubmit = async () => {
    const data = getValues()
    console.log(data)
    if (data.new_password != data.new_password2) {
      toast.error(`Password not matched, try again `)
    } else {
      try {
        setLoading(true)
        const resp = await axios.post('auth/change-password/', data)
        console.log(resp)

        setLoading(false)
        toast.success('You password have been updated', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
        })
        reset()
        window.location.reload()
      } catch (err) {
        setLoading(false)
        if (err?.response?.status === 400) {
          toast.error('Could not update your password', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: true,
          })
        } else {
          toast.error('An error occured try again', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: true,
          })
        }
      }
    }
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#000000b3] z-40 justify-center grid items-center `}
      >
        <div
          className="w-full max-w-[800px] bg-white justify-center rounded-2xl "
          ref={modalRef}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="p-10">
            <h3 className="p-10 text-center">Change Password</h3>
            <div
              className="w-full relative text-center "
              title="Enter your previous password here"
            >
              <InputComponent
                placeholder={`Enter password`}
                error={errors?.old_password?.message}
                register={register('old_password')}
                type={'password'}
                password
              />
            </div>
            <div className="w-full relative" title="Enter a new password here">
              <InputComponent
                error={errors?.new_password?.message}
                register={register('new_password')}
                type={'password'}
                placeholder={'Enter new password'}
                password
              />
            </div>
            <div
              className="w-full relative"
              title="Re-enter the new password here"
            >
              <InputComponent
                error={errors?.new_password2?.message}
                register={register('new_password2')}
                type={'password'}
                placeholder={'Confirm new password'}
                password
              />
            </div>

            <Button type="submit" loading={loading}>
              {loading ? (
                <CircularProgress color="info" thickness={10} size={18} />
              ) : (
                'Change'
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
export default PasswordChange
