const SectionThree = () => {
  // const history = useNavigate()
  // const access_token = localStorage.getItem('access_token')

  // const getStarted = () => {
  //   if (access_token) {
  //     history('/company/setup')
  //   } else {
  //     history('/signin')
  //   }
  // }

  return (
    <div className="flex flex-col items-center gap-14 px-5 md:px-12 xl:px-32 py-16">
      <p className="text-center px-16 text-lg md:text-2xl font-semibold ">
        Wondering why <span className="text-[#36F]">Andromedia</span> is the
        right choice?
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-10">
        <div className="flex flex-col justify-center gap-3 p-5 md:p-10 w-full h-[25rem] rounded-sm border border-[#ACA2A2]">
          <p className="text-center lg:px-16 text-lg md:text-xl font-semibold text-[#242424] mb-[1.5rem]">
            Track customer actions instantly in real-time.
          </p>

          <p className="text-sm xl:text-base text-center text-[#545454]">
            See which pages your visitors are on in real time, what they are
            searching for within your Knowledge Base and how often they visit
            your website. View activity across their entire journey. See clearly
            which team member responded to a customer last and maintain a
            complete conversation history.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3 p-5 md:p-10 w-full h-[25rem] rounded-sm border border-[#ACA2A2]">
          <p className="text-center lg:px-16 text-lg md:text-xl font-semibold text-[#242424] mb-[1.5rem]">
            Engage with customers wherever they are.
          </p>

          <p className="text-sm xl:text-base text-center text-[#545454]">
            Access is the currency of the web. You need to be where your
            customers are, and if you’re not, your competitors will be. With
            tools like Live Chat, Ticketing, a Knowledge Base and video and
            voice add-ons, you have what you need to be there for customers when
            and where they need you most.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3 p-5 md:p-10 w-full h-[25rem] rounded-sm border border-[#ACA2A2]">
          <p className="text-center lg:px-16 text-lg md:text-xl font-semibold text-[#242424] mb-[1.5rem]">
            Cooperate and allocate discussions.
          </p>

          <p className="text-sm xl:text-base text-center text-[#545454]">
            Tag and assign conversations to members of your team and ensure the
            right person is responding at the right time. Seeing the entire
            journey alongside customer data gives you the power to respond with
            context and ultimately create memorable and positive customer
            experiences.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3 p-5 md:p-10 w-full h-[25rem] rounded-sm border border-[#ACA2A2]">
          <p className="text-center lg:px-16 text-lg md:text-xl font-semibold text-[#242424] mb-[1.5rem]">
            Effortlessly exchange your expertise.
          </p>

          <p className="text-sm xl:text-base text-center text-[#545454]">
            Streamline support with a free customizable Knowledge Base that both
            your team and your customers are going to love. Easily share your
            team’s know-how internally alongside chats, then select what to
            publish publicly.
          </p>
        </div>
      </div>

      <p className="text-xl lg:text-2xl font-bold mt-[2rem] -mb-[2.5rem]">
        Andromedia helped us boost our sales by 10.8%.
      </p>

      <p className="text-lg lg:text-xl w-full md:w-[45rem] text-center">
        We have been using Andromedia for several years and it helped us deliver
        a 30% higher order value and 169 higher conversation rate
      </p>

      <div className="w-full bg-[#0CADF8] py-7 px-4 md:px-12 flex justify-between">
        <div className="flex flex-col items-center">
          <p className="text-white text-2xl md:text-5xl font-extrabold">95%</p>
          <p className="text-[#ffffffbf] text-sm md:text-base text-center">
            Satisfactory rate
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-white text-2xl md:text-5xl font-extrabold">+99%</p>
          <p className="text-[#ffffffbf] text-sm md:text-base text-center">
            Conversation rate
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-white text-2xl md:text-5xl font-extrabold">+95%</p>
          <p className="text-[#ffffffbf] text-sm md:text-base text-center">
            Average order rate
          </p>
        </div>
      </div>

      {/* <div className="my-7 flex flex-col gap-10 w-full md:w-[80%]">
        <p className="text-2xl md:text-4xl text-[#3592FF] text-center">
          Start engaging with your website visitors using live chat software in
          few minutes
        </p>

        <p className="text-xl text-center">
          Assist your customers and convert them into leads with Andromedia live
          chat platform for online sales conversions
        </p>

        <button
          onClick={getStarted}
          className="bg-[#71BDFF] text-white rounded-sm border-none outline-none py-3 px-3 mt-9 w-[10rem] font-medium mx-auto z-10"
        >
          Get Started
        </button>
      </div> */}
    </div>
  )
}

export default SectionThree
