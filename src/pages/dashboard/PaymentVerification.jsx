import { CircularProgress } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { Cookies } from 'react-cookie'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useSWR from 'swr'

function useQuery() {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

const PaymentVerification = () => {
  const navigate = useNavigate()
  const query = useQuery()
  const { data: res, loading } = useSWR(
    `payments/verify/${query?.get('trxref')}`
  )
  const [message, setMessage] = useState("")

  useEffect(() => {
    const cookie = new Cookies()
    const user = cookie.get('user')
    const token = cookie.get('access_token')
    if (!user || !token) {
      navigate('/login')
    }
    const verifyPayment = async () => {
      try {
        if (res.data.status === 'success') {
          toast.success('Payment verified successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000,
            hideProgressBar: false,
          })
          setMessage("Payment verified successfully!")
          navigate('/dashboard/settings/billing')
        }else {
          toast.error('Payment not Verified', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000,
            hideProgressBar: false,
          })
          setMessage("Payment not Verified!")
          navigate('/dashboard/settings/billing')
        }
      } catch (error) {
        toast.error('Payment verification failed', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 4000,
          hideProgressBar: false,
        })
      }
    }
    verifyPayment()
  }, [navigate, res?.data?.status])
  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <CircularProgress />
      ) : (
        <span className="font-medium text-2xl">{message}</span>
      )}
    </div>
  )
}

export default PaymentVerification
