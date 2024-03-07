import axios from 'axios'
import { useEffect } from 'react'
import { Cookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import PlusCircleIcon from '../components/utils/icons/PlusCircleIcon'
import WwwWebIcon from '../components/utils/icons/WwwWebIcon'
import { getNextMonth } from '../constants/auth_actions'
import {
  setAllCompanies,
  setSelectedComp,
} from '../store/reducers/auth_reducer'
import { setCallConversationIdList } from '../store/reducers/call_reducer'
import { setSelectedCompany } from '../store/reducers/dashboard_reducer'

const DropDown = ({ modalRef, setIsModalOpen, setShowLoading }) => {
  const { allCompanies } = useSelector((state) => state.auth)
  // const [showLoading, setShowLoading] = useState(false)
  //console.log(`Allcompanies`, allCompanies)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selectedCompany = useSelector(
    (state) => state.dashboard.selectedCompany
  )
  const { data: companies } = useSWR(`companies/`)

  if (companies) dispatch(setAllCompanies(companies))

  //console.log(companies)

  const cookies = new Cookies()
  const user = cookies.get(`user`)

  const getCompany = async (id) => {
    const expiringDate = getNextMonth()
    try {
      const comp = allCompanies?.find((company) => company?.id === id)
      //for Bright
      dispatch(setSelectedCompany(comp?.id))
      //for All
      dispatch(setSelectedComp(comp))
      //for company cookie users
      cookies.set('company', comp, {
        path: '/',
        secure: false,
        sameSite: 'Lax',
        expires: expiringDate,
      })

      setIsModalOpen(false)

      setShowLoading(true)

      setTimeout(() => {
        setShowLoading(false)
        window.location.reload()
      }, 3000)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }
  // const cookie = new Cookies()
  // const company = cookie.get(`company`)
  // console.log(`Company cookie`, company)

  useEffect(() => {
    const fetchConversationsList = async () => {
      const conversationsList = await axios.get(
        `/conversations/${selectedCompany || companies[0]?.id}/`
      )
      //console.log('before', selectedCompany)
      const ids =
        conversationsList && conversationsList?.data?.map((item) => item?.id)
      //console.log('Dropdown', selectedCompany, ids)
      dispatch(setCallConversationIdList(ids))
    }
    fetchConversationsList()
  }, [companies, dispatch, selectedCompany])

  // if (showLoading) return <ProgressBarPage />

  return (
    <div className="bg-[#00000033] fixed w-full h-full z-30">
      <div
        ref={modalRef}
        className="bg-[#225EA3] max-w-[600px] fixed right-4 top-20 rounded-lg p-5 text-white text-sm z-30"
      >
        {/* <div className="relative">
          <input
            className="w-full p-2 rounded-[5px] bg-[#588bc5] mb-8"
            placeholder="Search"
          />
          <div className="absolute top-3 right-2">
            <SearchIconSm />
          </div>
        </div> */}
        <div className="text-xl font-semibold text-gray-400 mb-3">
          List of Properties
        </div>
        {!user && <div>Please Login</div>}
        {!allCompanies && <div>Loading...</div>}
        {allCompanies &&
          allCompanies?.map((item, idx) => (
            <div key={idx}>
              <div
                className="flex gap-3 py-2 items-center cursor-pointer"
                onClick={() => {
                  getCompany(item?.id)
                }}
                title="Click to select this company's properties"
              >
                <WwwWebIcon />
                <div>
                  <p>{item?.name}</p>
                  <p className="text-gray-300">{item?.website_url}</p>
                </div>
              </div>
            </div>
          ))}
        <button
          onClick={() => navigate('/company/setup')}
          className="w-full justif justify-center rounded-[5px] mt-8 bg-[#172e47] p-1 flex gap-3 items-center "
          title="Click to add new company properties"
        >
          <PlusCircleIcon />
          Add Property
        </button>
      </div>
    </div>
  )
}
export default DropDown
