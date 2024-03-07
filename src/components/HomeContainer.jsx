import { Cookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import home_chat from '../assets/images/home/home_chat.png'
import home_svg from '../assets/images/home/home_svg.png'
import SectionFour from './about/SectionFour'
import SectionThree from './about/SectionThree'
import Layout from './common/Layout'
import HomeCard from './utils/cards/HomeCard'

const HomeContainer = () => {
  const navigate = useNavigate()
  const cookie = new Cookies()
  const access_token = cookie.get(`access_token`)

  return (
    <Layout>
      <div className="px-7 md:px-12 lg:px-20 py-14">
        <div className="flex flex-col justify-center items-center gap-14">
          <p className="gotham font-bold tracking-wide text-3xl lg:text-5xl text-center leading-normal">
            Enhance Your Customer <br />
            Service Efficiency
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-10 lg:gap-14">
            <HomeCard
              title={'Engage with Your Customers'}
              description={
                'Engage with your customers in real time to offer proactive sales and support assistance with live chat.'
              }
            />
            <HomeCard
              title={'Earn Their Adoration!'}
              description={
                'Engage with your customers in real time to offer proactive sales and support assistance with live chat.'
              }
            />
          </div>

          <button
            onClick={() => {
              if (access_token) {
                navigate('/company/setup')
              } else {
                navigate('/register')
              }
            }}
            className="bg-[#1F1F1F] text-white text-sm font-semibold py-2 px-3 w-[14rem] rounded-3xl"
          >
            Get started now
          </button>
        </div>

        <div className="flex flex-col lg:flex-row justify-evenly items-center gap-5 pt-12 space-y-5">
          <img src={home_svg} alt="" />

          <div className="lg:w-[35rem] flex flex-col gap-5 lg:gap-16">
            <p className="gotham text-[#111B3D] text-xl lg:text-3xl text-center leading-7">
              We&apos;re passionate about transforming the way businesses
              connect with their customers.{' '}
            </p>

            <p className="text-[#5E516F] text-sm lg:text-lg">
              We aim to empower businesses of all sizes to build stronger, more
              meaningful relationships with their customers. We believe that
              every interaction is an opportunity to create a positive impact,
              and we&apos;re here to make those interactions seamless and
              memorable.
            </p>
          </div>
        </div>

        <p className="md:-mb-10 lg:-mb-20 mt-5 text-center text-xl lg:text-2xl font-semibold lg:my-16 py-5 md:py-16">
          Why <span className="text-[#3366FF]">Andromedia</span>
        </p>
        <div className="flex flex-col md:flex-row justify-evenly items-center lg:gap-5 lg:space-y-32">
          <div className="flex flex-col gap-5 md:gap-7 lg:w-[35rem]">
            <p className="text-[#080F1A] text-xl lg:text-3xl">
              Engage website
              <br /> visitors with Live Chat
            </p>

            <p className="text-[#647491] text-sm lg:text-lg">
              Track users across your website and see what pages they’re
              browsing in real time. <br />
              <br />
              Engage your visitors through the live chat widget and offer
              personalized discounts based on their activity to turn them into
              loyal customers.
            </p>
          </div>
          <img
            src={home_chat}
            alt=""
            className="max-[768px]:w-full max-[1023px]:w-[20rem]"
          />
        </div>
        <SectionThree />
        <SectionFour />
      </div>
    </Layout>
  )
}

export default HomeContainer
