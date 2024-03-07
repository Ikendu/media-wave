import phoneImg from '../../assets/images/about/about_phone.png'

const SectionTwo = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-evenly gap-5 lg:gap-14 px-7 md:px-12 lg:px-20 py-7">
      <div className="flex flex-col gap-4 p-5 md:p-10 w-full md:w-[500px] h-[600px] bg-[#5B73A6] rounded-xl">
        <p className="font-medium text-white">
          We offer a comprehensive suite of features designed to streamline your
          customer interactions. From live chat to in-depth analytics,
          we&apos;ve got you covered.
        </p>
        <div className="flex-1 grid grid-cols-2 w-full gap-2">
          <div className="bg-[#D9D9D961] text-white font-medium text-center place-items-center rounded-sm flex">
            <p className="m-auto font-semibold text-sm lg:text-base">
              Feature-Rich
            </p>
          </div>
          <div className="bg-[#D9D9D961] text-white font-medium text-center place-items-center rounded-sm flex">
            <p className="m-auto font-semibold text-sm lg:text-base">
              Customization
            </p>
          </div>
          <div className="bg-[#D9D9D961] text-white font-medium text-center place-items-center rounded-sm flex">
            <p className="m-auto font-semibold text-sm lg:text-base">Support</p>
          </div>
          <div className="bg-[#D9D9D961] text-white font-medium text-center rounded-sm flex">
            <p className="m-auto font-semibold text-sm lg:text-base">
              Data-Driven Insights
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:inline-block">
        <img src={phoneImg} alt="" className="h-[600px]" />
      </div>
    </div>
  )
}

export default SectionTwo
