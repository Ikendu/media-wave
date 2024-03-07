import { Box, Modal, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  setIsEditContact,
  setIsModalOpen,
  setShowAddContact,
} from '../../../store/reducers/dashboard_reducer'
import modalStyles from '../../common/ModalStyles'
import AddContact from './AddContact'
import ContactDetails from './ContactDetails'
import Contacts from './Contacts'
import EditContact from './EditContact'

const ContactList = () => {
  const dispatch = useDispatch()
  const isEditContact = useSelector((state) => state.dashboard.isEditContact)
  const showAddContact = useSelector((state) => state.dashboard.showAddContact)
  const isModalOpen = useSelector((state) => state.dashboard.isModalOpen)
  const isMediumScreen = useMediaQuery('(max-width: 1024px)')
  return (
    <>
    <div className="bg-white relative p-4 flex justify-around items-center">
            <div className="absolute left-0 flex items-center space-x-44">
              <p className="text-[#0a0a0f] lg:text-lg font-medium min-w-max">
                Contact List
              </p>
              <div>
                <button
                  onClick={() => {
                    dispatch(setIsEditContact(false))
                    dispatch(setShowAddContact(true))
                    if (isMediumScreen) {
                      dispatch(setIsModalOpen(!isModalOpen))
                    }
                  }}
                  className="outline-none font-semibold text-sm text-white rounded-xl bg-[#3e7ede] border-2 border-[#3e7ede] p-3 shadow-md z-20"
                >
                  Add Contact +
                </button>
              </div>
              {/* this is the code for the modal only on small devices */}
              <Modal
                open={isModalOpen}
                onClose={() => dispatch(setIsModalOpen(!isModalOpen))}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyles}>
                  {showAddContact ? (
                    <AddContact />
                  ) : isEditContact ? (
                    <EditContact />
                  ) : (
                    <ContactDetails />
                  )}
                </Box>
              </Modal>
            </div>
          </div>
          <div className="flex gap-5 p-2 md:p-4 lg:p-7 pt-0 h-full">
            <Contacts />
            {/* this is the code for the modal only on large devices */}
            <div className="w-[30%] h-full hidden lg:block">
              {showAddContact ? (
                <AddContact />
              ) : isEditContact ? (
                <EditContact />
              ) : (
                <ContactDetails />
              )}
            </div>
          </div>
          </>
  )
}

export default ContactList