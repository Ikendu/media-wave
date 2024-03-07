import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import bodyImg from '../assets/images/pricing/body_img.png'
import headerImg from '../assets/images/pricing/header_img.png'
import Layout from './common/Layout'
import TickFillIcon from './utils/icons/TickFillIcon'

const fetcher = async (url) => {
  const res = await axios.get(url, {
    headers: { Authorization: '' },
  })
  return res.data
}

const Pricing = () => {
  const [planProperties, setPlanProperties] = useState({})
  const navigate = useNavigate()

  const { data: plans } = useSWR('subscription-plans', (url) => fetcher(url))

  useEffect(() => {
    const planPropertiesMapping = {
      free: {
        bgColor: '#040D42',
        textColor: 'white',
        include: false,
        size: 'small',
      },
      personal: {
        bgColor: 'white',
        textColor: 'black',
        include: true,
        size: 'large',
      },
      developer: {
        bgColor: 'white',
        textColor: 'black',
        include: true,
        size: 'large',
      },
      enterprise: {
        bgColor: '#040D42',
        textColor: 'white',
        include: false,
        size: 'small',
      },
    }

    const fetchPlanProperties = () => {
      const properties = {}
      plans?.forEach((plan) => {
        const { name } = plan
        if (planPropertiesMapping[name]) {
          properties[name] = planPropertiesMapping[name]
        }
      })
      setPlanProperties(properties)
    }
    fetchPlanProperties()
  }, [plans])

  const handleClick = () => {
    navigate('/register')
  }

  return (
    <Layout>
      <div className="w-full">
        <div className="font-[Poppins] flex flex-col justify-center gap-1 items-center text-white bg-[#225EA3] h-[46vh]">
          <h1 className=" text-2xl md:text-[40px] pb-4 font-extrabold">
            Pricing Plan
          </h1>
          <h2 className=" text-xl md:text-[32px]">
            Choose a plan that fits your needs.
          </h2>
          <img
            src={headerImg}
            alt=""
            className="w-[520px] h-[300px] absolute top-[100px] md:top-[95px] left-0 object-cover"
          />
        </div>
        <div className="-translate-y-[40px] flex justify-center items-center mb-8 font-[Nunito] min-h-[35rem]">
          <div className="w-[95%] md:w-[600px] lg:w-[920px] grid grid-cols-1 md:grid-cols-2 place-items-center gap-4 md:gap-2">
            {plans?.map((plan) => (
              <div
                key={plan?.id}
                className={`text-${
                  planProperties[plan?.name]?.textColor
                } flex flex-col justify-around rounded-md items-center shadow-xl px-4 lg:w-[450px] w-full`}
                style={{
                  height:
                    planProperties[plan?.name]?.size === 'small'
                      ? '450px'
                      : '500px',
                  backgroundColor: planProperties[plan?.name]?.bgColor,
                }}
              >
                <div className="flex flex-col gap-2 items-center">
                  <h2 className="font-extrabold text-4xl capitalize">
                    {`${plan?.name} plan`}
                  </h2>
                  <figure className="bg-white h-[2px] w-[100px]"></figure>
                </div>
                {plan?.price !== '0.00' && (
                  <div className="text-6xl font-extrabold font-[Poppins]">
                    {plan?.price !== '0.00' && (
                      <span className="text-4xl">$</span>
                    )}
                    <span>
                      {plan?.price === '0.00'
                        ? ''
                        : (plan?.price || '0.00').split('.')[0]}
                    </span>

                    <span className="text-4xl">
                      {plan?.price === '0.00'
                        ? ''
                        : (plan?.price || '0.00').split('.')[1]
                          ? '.' + (plan?.price || '0.00').split('.')[1]
                          : ''}
                    </span>
                  </div>
                )}
                {planProperties[plan?.name]?.include ? (
                  <div className="w-full flex items-center gap-8 px-4 text-[#5C5C5C] justify-around">
                    <figure className="bg-[#5C5C5C] h-[1px] w-full"></figure>
                    <span className="whitespace-nowrap text-xl">
                      All plans include
                    </span>
                    <figure className="bg-[#5C5C5C] h-[1px] w-full"></figure>
                  </div>
                ) : null}
                <div className="text-[14px] flex justify-between sm:justify-around font-semibold gap-2 w-full">
                  <div className="flex w-fit justify-between flex-col">
                    <div className="whitespace-nowrap  flex items-center gap-2">
                      <TickFillIcon />
                      <span>{`${plan?.max_website} websites`}</span>
                    </div>
                    <div className="whitespace-nowrap flex items-center  gap-2">
                      <TickFillIcon />
                      <span>200+ Templates</span>
                    </div>
                  </div>
                  <div className="flex w-fit gap-[10px] flex-col">
                    <div className="whitespace-nowrap flex items-center gap-2">
                      <TickFillIcon />
                      <span>24/7 Support</span>
                    </div>
                    <div className="whitespace-nowrap flex items-center gap-2">
                      <TickFillIcon />
                      <span className="whitespace-nowrap">
                        Unlimited Emails
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className="text-white bg-[#0052FF] text-[18px] w-[200px] py-3 rounded-md mb-1"
                  onClick={handleClick}
                >
                  {plan?.name === 'free'
                    ? 'Start My Free Trial'
                    : 'Subscribe Now'}
                </button>
              </div>
            ))}
            <img
              src={bodyImg}
              alt=""
              className="hidden md:block absolute z-[-1] h-[650px] left-[58%] top-[20%]"
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Pricing
