import { Cookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import ChatApiIcon from '../utils/icons/ChatApiIcon'
import ChatIcon from '../utils/icons/ChatIcon'
import ChatbotIcon from '../utils/icons/ChatbotIcon'
import CoBrowsingIcon from '../utils/icons/CoBrowsingIcon'
import MultiChannelIcon from '../utils/icons/MultiChannelIcon'
import VideoChatIcon from '../utils/icons/VideoChatIcon'

const items = [
  {
    icon: <ChatIcon />,
    title: 'Live Chat',
    description:
      'See which pages your visitors are on in real time, what they are searching for within your Knowledge Base and how often they visit your website. View activity across their entire journey. See clearly which team member responded to a customer last and maintain a complete conversation history.',
  },
  {
    icon: <ChatbotIcon />,
    title: 'Chatbots',
    description:
      'See which pages your visitors are on in real time, what they are searching for within your Knowledge Base and how often they visit your website. View activity across their entire journey. See clearly which team member responded to a customer last and maintain a complete conversation history.',
  },
  {
    icon: <VideoChatIcon />,
    title: 'Video Chat',
    description:
      'See which pages your visitors are on in real time, what they are searching for within your Knowledge Base and how often they visit your website. View activity across their entire journey. See clearly which team member responded to a customer last and maintain a complete conversation history.',
  },
  {
    icon: <CoBrowsingIcon />,
    title: 'Co-browsing',
    description:
      'See which pages your visitors are on in real time, what they are searching for within your Knowledge Base and how often they visit your website. View activity across their entire journey. See clearly which team member responded to a customer last and maintain a complete conversation history.',
  },
  {
    icon: <MultiChannelIcon />,
    title: 'Multi Channel',
    description:
      'See which pages your visitors are on in real time, what they are searching for within your Knowledge Base and how often they visit your website. View activity across their entire journey. See clearly which team member responded to a customer last and maintain a complete conversation history.',
  },
  {
    icon: <ChatApiIcon />,
    title: 'Chat API & SDK',
    description:
      'See which pages your visitors are on in real time, what they are searching for within your Knowledge Base and how often they visit your website. View activity across their entire journey. See clearly which team member responded to a customer last and maintain a complete conversation history.',
  },
]

const SectionFour = () => {
  const navigate = useNavigate()
  //const access_token = localStorage.getItem('access_token')
  //const current_company_id = localStorage.getItem('current_company_id')
  const cookie = new Cookies()
  const access_token = cookie.get(`access_token`)

  return (
    <div className="flex flex-col items-center gap-14 px-5 md:px-12 xl:px-32 py-16">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-10">
        {items?.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-center gap-3 p-5 md:p-10 w-full h-[25rem] rounded-sm shadow-2xl"
          >
            <div className="mx-auto">{item?.icon}</div>
            <p className="text-center lg:px-16 text-lg md:text-xl font-semibold text-[#0F1117] mb-[0.5rem]">
              {item?.title}
            </p>

            <p className="text-sm xl:text-base text-[#000000DE]">
              {item?.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5 lg:gap-7 mt-[3rem] lg:mt-[4rem]">
        <p className="text-[#5B73A6] text-center font-medium text-2xl lg:text-4xl lg:w-[55rem] leading-normal">
          Start engaging with your website visitors using live chat software in
          few minutes
        </p>

        <p className="text-center text-xl lg:w-[55rem] leading-normal">
          Assist your customers and convert them into leads with Andromedia live
          chat platform for online sales conversions
        </p>

        <button
          onClick={() => {
            if (access_token) {
              navigate('/company/setup')
            } else {
              navigate('/register')
            }
          }}
          className="bg-[#71BDFF] p-4 w-[12rem] text-sm font-semibold text-white uppercase mx-auto rounded-sm"
        >
          get started
        </button>
      </div>
    </div>
  )
}

export default SectionFour
