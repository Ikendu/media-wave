import useSWR from 'swr'

const PricingContainer = () => {
  const { data: plans } = useSWR('subscription-plans')
  console.log(plans)

  return (
    <div className="mx-auto bg-gradient-to-b from-[#85AAD4] to-[#152D4800] min-h-[35rem] w-full grid-autofill place-items-center gap-3 px-7 pt-20">
      {plans?.map((plan, idx) => (
        <div
          key={idx}
          className="bg-[#d9d9d942] h-[30rem] w-[18rem] flex flex-col items-center gap-4 p-10 justify-around"
        >
          <p className="text-[#DFEEFF] font-semibold text-xl capitalize">
            {plan?.description}
          </p>
          <div className="text-white flex flex-col items-center">
            <p>{`${plan?.max_website} websites`}</p>
          </div>
          <div className="flex flex-col items-center text-white">
            <p className="text-5xl font-extrabold">
              <span className="text-4xl">$</span>
              {plan?.price?.split('.')[0]}
              <span className="text-2xl">{`.${
                plan?.price?.split('.')[1]
              }`}</span>
            </p>
            <p className="text-base font-bold">{plan?.duration}</p>
          </div>

          <p className="text-lg text-white cursor-pointer">Subscribe Now</p>
        </div>
      ))}
    </div>
  )
}

export default PricingContainer
