import { createBrowserRouter } from 'react-router-dom'
import Pricing from '../components/Pricing'
import CompanySetup from '../components/chat_setup'
import ProgressBarPage from '../components/common/ProgressBarPage'
import Payment from '../components/dashboard/settings/billing/Payment'
import Upgrade from '../components/dashboard/settings/billing/Upgrade'
import NotificationSettings from '../components/dashboard/settings/notifications/NotificationSetings'
import DashboardLayout from '../layout/DashboardLayout'
import Application from '../pages/Application'
import Contact from '../pages/Contact'
import Faq from '../pages/Faq'
import Home from '../pages/Home'
import LoginPage from '../pages/LoginPage'
import LiveChat from '../pages/Messages/LiveChat'
// import Pricing from '../pages/Pricing'
import ForgotPasswordMain from '../components/auth/forgot_password'
import ReceiverVideoCallPage from '../pages/Messages/ReceiverVideoCallPage'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import SignupPage from '../pages/SignupPage'
import SignupVerificationPage from '../pages/SignupVerificationPage'
import Billing from '../pages/dashboard/Billing'
import ChatSettings from '../pages/dashboard/ChatSettings'
import ContactList from '../pages/dashboard/ContactList'
import DepartmentSettings from '../pages/dashboard/DepartmentSettings'
import IndexBoard from '../pages/dashboard/IndexBoard'
import Notification from '../pages/dashboard/Notification'
import OperatorSettings from '../pages/dashboard/OperatorSettings'
import PaymentVerification from '../pages/dashboard/PaymentVerification'
import ProfileSettings from '../pages/dashboard/ProfileSettings'
import VisitorsList from '../pages/dashboard/VisitorsList'
import AnalyticPage from '../pages/dashboard/dashboardFiles/AnalyticPage'

const router = createBrowserRouter([
  {
    path: '*',
    element: <div>page not found</div>, // 404 page to be completed
  },
  {
    path: '/',
    element: <Home />, // Home page
  },
  // {
  //   path: '/about',
  //   element: <About />, // About us page
  // },
  {
    path: '/contact',
    element: <Contact />, // contact us page
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />, // privay policy page
  },
  {
    path: '/application',
    element: <Application />, // application page
  },
  {
    path: '/login',
    element: <LoginPage />, // login page
  },
  {
    path: '/register',
    element: <SignupPage />, // signup page
  },
  {
    path: '/register-verify',
    element: <SignupVerificationPage />, // signup otp verification page
  },
  // {
  //   path: '/forgot-password-verify',
  //   element: <ForgotPasswordOtpPage />, // forgot password otp verification page
  // },
  {
    path: '/forgot-password',
    element: <ForgotPasswordMain />, // forgot password otp verification page
  },
  // {
  //   path: '/change-password',
  //   element: <ForgotPassword />, // forgot password otp verification page
  // },
  {
    path: '/company/setup',
    element: <CompanySetup />, // company setup page
  },
  {
    path: '/faq',
    element: <Faq />, // FAQ page
  },
  {
    path: '/pricing',
    element: <Pricing />, // FAQ page
  },
  {
    path: '/loadingpage',
    element: <ProgressBarPage />, // FAQ page
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <IndexBoard />,
      },
      {
        path: 'contacts',
        element: <ContactList />,
      },
      {
        path: 'contacts/visitors',
        element: <VisitorsList />,
      },
      {
        path: 'notifications',
        element: <Notification />,
      },
      {
        path: 'notifications/settings',
        element: <NotificationSettings />,
      },
      {
        path: 'settings',
        element: <ProfileSettings />,
      },
      {
        path: 'analytics',
        element: <AnalyticPage />,
      },
      {
        path: 'settings/operators',
        element: <OperatorSettings />,
      },
      {
        path: 'settings/departments',
        element: <DepartmentSettings />,
      },
      {
        path: 'settings/chat',
        element: <ChatSettings />,
      },
      {
        path: 'settings/billing',
        element: <Billing />,
      },
      {
        path: 'settings/billing/callback',
        element: <PaymentVerification />,
      },
      {
        path: 'settings/billing/upgrade',
        element: <Upgrade />,
      },
      {
        path: 'settings/billing/payment',
        element: <Payment />,
      },
      {
        path: 'inbox/:path',
        element: <LiveChat />,
      },
      // {
      //   path: 'inbox/open',
      //   element: <Open />,
      // },
      // {
      //   path: 'inbox/pending',
      //   element: <Pending />,
      // },
      // {
      //   path: 'inbox/solved',
      //   element: <Solved />,
      // },
      {
        path: 'join-meeting',
        element: <ReceiverVideoCallPage />,
      },
      // {
      //   path: 'join-video',
      //   element: <MainVideoPage />,
      // },
      {
        path: '*',
        element: <div>not found</div>,
      },
    ],
  },
])

export default router
