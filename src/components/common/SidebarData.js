import { ArrowDropDown } from '@mui/icons-material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setActiveItem } from '../../store/reducers/dashboard_reducer'
import AnalyticsIcon from '../utils/icons/AnalyticsIcon'
import ContactIcon from '../utils/icons/ContactIcon'
import ContactsFillIcon from '../utils/icons/ContactsFillIcon'
import EmailIcon from '../utils/icons/EmailIcon'
import HomeIcon from '../utils/icons/HomeIcon'
import InboxIcon from '../utils/icons/InboxIcon'
import NotificationBellIcon from '../utils/icons/NotificationBellIcon'
import NotificationFillIcon from '../utils/icons/NotificationFillIcon'
import OpenIcon from '../utils/icons/OpenIcon'
import PendingIcon from '../utils/icons/PendingIcon'
import PriceTagIcon from '../utils/icons/PriceTagIcon'
import ProfileCircleIcon from '../utils/icons/ProfileCircleIcon'
import SettingsIcon from '../utils/icons/SettingsIcon'
import SolvedIcon from '../utils/icons/SolvedIcon'
import TeamFillIcon from '../utils/icons/TeamFillIcon'
import VisitorsFillIcon from '../utils/icons/VisitorsFillIcon'

export const navigations = {
  Settings: React.createElement(SettingsIcon),
  Dashboard: React.createElement(HomeIcon),
  Inbox: React.createElement(InboxIcon),
  Contacts: React.createElement(ContactIcon),
  Email: React.createElement(EmailIcon),
  Analytics: React.createElement(AnalyticsIcon),
}

export const navigationItemsOptions = {
  Settings: [
    {
      icon: React.createElement(NotificationFillIcon),
      label: 'Widget',
      to: 'settings/chat',
    },
    {
      icon: React.createElement(TeamFillIcon),
      label: 'Team',
      to: '',
      dropDown: {
        icon: React.createElement(ArrowDropDown),
        items: [
          {
            label: 'Operator',
            to: '/dashboard/settings/operators',
          },
          {
            label: 'Department',
            to: '/dashboard/settings/departments',
          },
        ],
      },
    },
    // {
    //   icon: React.createElement(EmailNewIcon),
    //   label: 'Email Marketing',
    //   to: '',
    // },
    {
      icon: React.createElement(PriceTagIcon),
      label: 'Billing & Pricing',
      to: '/dashboard/settings/billing',
    },
    {
      icon: React.createElement(ProfileCircleIcon),
      label: 'Profile',
      to: 'settings',
    },
    {
      icon: React.createElement(NotificationBellIcon),
      label: 'Notification',
      to: '/dashboard/notifications/settings',
    },
  ],

  Contacts: [
    {
      icon: React.createElement(VisitorsFillIcon),
      label: 'Visitors',
      to: 'contacts/visitors',
    },
    {
      icon: React.createElement(ContactsFillIcon),
      label: 'All Contacts',
      to: 'contacts/',
    },
  ],
  Inbox: [
    {
      icon: React.createElement(PendingIcon),
      label: 'Pending',
      to: 'inbox/pending',
    },
    {
      icon: React.createElement(OpenIcon),
      label: 'Open',
      to: 'inbox/open',
    },
    {
      icon: React.createElement(SolvedIcon),
      label: 'Solved',
      to: 'inbox/solved',
    },
  ],
}

export const useNavigation = () => {
  const dispatch = useDispatch()

  const handleItemClick = (label) => {
    dispatch(setActiveItem(label))
  }

  return { handleItemClick }
}
