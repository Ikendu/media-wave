import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import useSWR from 'swr'
import { setContacts } from '../../../store/reducers/contacts_reducer'
import ContactList from './ContactList'
import NoContact from './NoContact'

const ContactListContainer = () => {
  const companyId = new Cookies().get('company')?.id
  const { data: contacts } = useSWR(`companies/${companyId}/customers`)
  const [contactPageState, setContactPageState] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (Array.isArray(contacts) && contacts.length > 0) {
      dispatch(setContacts(contacts))
    }
  }, [contacts, dispatch])

  const handleClick = () => {
    setContactPageState(true)
  }

  return (
    <div className="space-y-10 -z-10 flex flex-col gap-5 px-5 md:px-16 pt-8  h-screen">
      {/* Contact Header */}
      {contacts?.length !== 0 || contactPageState ? (
        <ContactList />
      ) : (
        <NoContact handleClick={handleClick} />
      )}
    </div>
  )
}

export default ContactListContainer
