import { Box, CircularProgress, Modal } from '@mui/material'
import { Cookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import useSWR from 'swr'
import { setIsModalOpen } from '../../../store/reducers/dashboard_reducer'
import modalStyles from '../../common/ModalStyles'
import NoVisitor from './NoVisitor'
import Visitors from './Visitors'
import VisitorsDetails from './VisitorsDetails'

const VisitorsContainer = () => {
  const dispatch = useDispatch()
  const cookie = new Cookies()
  const companyId = cookie.get('company')?.id
  const isModalOpen = useSelector((state) => state.dashboard.isModalOpen)

  const { data: customers } = useSWR(`companies/${companyId}/customers`)
  const visitorsList = customers?.filter((customer) => customer?.is_vistor)

  return (
    <div className="space-y-10 -z-10 flex flex-col gap-5 px-5 md:px-16 pt-8  h-screen">
      {!visitorsList ? (
        <CircularProgress color="secondary" thickness={10} size={18} />
      ) : visitorsList.length === 0 ? (
        <NoVisitor />
      ) : (
        <div className="h-[100vh] flex flex-col gap-5">
          <div className="bg-white p-8 flex justify-between items-center">
            <p className="text-[#0a0a0f] lg:text-lg font-medium min-w-max">
              Visitors
            </p>
          </div>
          <div className="flex gap-5 p-2 md:p-4 lg:p-7 pt-0 h-full">
            <Modal
              open={isModalOpen}
              onClose={() => dispatch(setIsModalOpen(!isModalOpen))}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyles}>
                <VisitorsDetails />
              </Box>
            </Modal>
            <Visitors />
            <div className="w-[30%] h-full hidden lg:block">
              <VisitorsDetails />
            </div>
          </div>
        </div>
      )}
      {/* {
      loading && (
        <CircularProgress color="secondary" thickness={10} size={18} />
      ) : visitorsList?.length == 0 || !visitorsList ? (
        <NoVisitor />
      ) : (
        <div className="h-[100vh] flex flex-col gap-5">
          <div className="bg-white p-8 flex justify-between items-center">
            <p className="text-[#0a0a0f] lg:text-lg font-medium min-w-max">
              Visitors
            </p>
          </div>
          <div className="flex gap-5 p-2 md:p-4 lg:p-7 pt-0 h-full">
            <Modal
              open={isModalOpen}
              onClose={() => dispatch(setIsModalOpen(!isModalOpen))}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyles}>
                <VisitorsDetails />
              </Box>
            </Modal>
            <Visitors />
            <div className="w-[30%] h-full hidden lg:block">
              <VisitorsDetails />
            </div>
          </div>
        </div>
      )} */}
    </div>
  )
}

export default VisitorsContainer
