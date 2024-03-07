import Thick from './Thick'

const Cardbox = () => {
  // const [wath,setWath] = useState(window.innerWidth)
  // setWath(window.innerWidth)
  console.log(window.innerWidth)
  return (
    <div className="mainBox w-full h-fit grid grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(2,1fr)] sm:gap-[5px] gap-[10px] px-[5px]">
      <div className="h-[180px] bg-white sm:bg-[rgb(4,13,66)] sm:w-[175px] w-full text-black sm:text-[white] flex flex-col justify-around justify-self-end rounded-[3px] items-center self-center smallBox shadow-xl sm:shadow- px-[10px]">
        <div className="font-[700] font-[Nunito] flex flex-col  items-center">
          <h2>Free Plan</h2>
          <figure className="bg-white h-[1.5px] w-[50px]"></figure>
        </div>

        <div className="plan w-full flex items-center gap-[5px] px-[10px] text-[grey] justify-around sm:hidden">
          <figure className="bg-[grey] h-[1px] w-full"></figure>
          <span className="whitespace-nowrap text-[9px]">
            All plans incliudes
          </span>
          <figure className="bg-[grey] h-[1px] w-full"></figure>
        </div>

        <div className="flex justify-between sm:justify-around text-[1.5vw] sm:text-[6px] gap-[10px] w-full compBox">
          <div className="flex w-fit justify-between px-[5px] flex-col comp">
            <div className="white-space-[nowrap] flex items-center  gap-[2px]">
              <Thick />
              <span className="whitespace-nowrap">200+ Templates</span>
            </div>
            <div className="white-space-[nowrap] flex items-center gap-[2px]">
              <Thick />
              <span className="whitespace-nowrap">24/7 Support</span>
            </div>
          </div>
          <div className="flex w-fit gap-[10px] px-[5px] flex-col comp">
            <div className="white-space-[nowrap] flex items-center gap-[2px]">
              <Thick />
              <span className="whitespace-nowrap">Unlimited Emails</span>
            </div>

            <div className="white-space-nowrap  flex items-center gap-[2px]">
              <Thick />
              <span className="whitespace-nowrap">Unlimited Automations</span>
            </div>
          </div>
        </div>

        <button className="text-[whitesmoke] bg-[#0052FF] text-[9px] py-[5px] px-[15px] rounded-[3px] mb-[10px]">
          Start My Free trial
        </button>
      </div>

      <div className="bg-[rgb(4,13,66)] sm:bg-[white] w-full sm:w-[190px] h-[200px] shadow-xl text-white sm:text-[black] flex flex-col items-center justify-around rounded-[3px] self-center smallBox px-[10px]">
        <div className="font-[700] font-[Nunito] flex flex-col  items-center">
          <h2>Personal Plan</h2>
        </div>
        <div className="text-[25px] font-[800] font-[Poppins]">
          <span className="text-[15px]">$</span>
          <span>3</span>
          <span className="text-[15px]">.55</span>
        </div>
        <div className="plan w-full flex items-center gap-[5px] px-[10px] text-[grey] justify-around">
          <figure className="bg-[grey] h-[1px] w-full"></figure>
          <span className="whitespace-nowrap text-[9px]">
            All plans incliudes
          </span>
          <figure className="bg-[grey] h-[1px] w-full"></figure>
        </div>
        <div className="flex justify-between sm:justify-around text-[1.5vw] sm:text-[6px] gap-[10px] w-full compBox">
          <div className="flex w-fit justify-between px-[5px] flex-col comp">
            <div className="white-space-[nowrap] flex items-center  gap-[2px]">
              <Thick />
              <span className="whitespace-nowrap">200+ Templates</span>
            </div>
            <div className="white-space-[nowrap] flex items-center gap-[2px]">
              <Thick />
              <span className="whitespace-nowrap">24/7 Support</span>
            </div>
          </div>
          <div className="flex w-fit gap-[10px] px-[5px] flex-col comp">
            <div className="white-space-[nowrap] flex items-center gap-[2px]">
              <Thick />
              <span className="whitespace-nowrap">Unlimited Emails</span>
            </div>

            <div className="white-space-nowrap  flex items-center gap-[2px]">
              <Thick />
              <span className="whitespace-nowrap">Unlimited Automations</span>
            </div>
          </div>
        </div>

        <button className="text-[whitesmoke] bg-[#0052FF] text-[9px] py-[5px] px-[15px] rounded-[3px] mb-[10px]">
          Subscribe Now
        </button>
      </div>

      <div className=" bg-[white] w-full sm:w-[190px] h-[200px] shadow-xl  text-[black] flex flex-col items-center justify-around rounded-[3px] self-center justify-self-end smallBox px-[10px]">
        <div className="font-[700] font-[Nunito] flex flex-col  items-center">
          <h2>Developers Plan</h2>
        </div>
        <div className="text-[25px] font-[800] font-[Poppins]">
          <span className="text-[15px]">$</span>
          <span>6</span>
          <span className="text-[15px]">.55</span>
        </div>

        <div className="plan w-full flex items-center gap-[5px] px-[10px] text-[grey] justify-around">
          <figure className="bg-[grey] h-[1px] w-full"></figure>
          <span className="whitespace-nowrap text-[9px]">
            All plans incliudes
          </span>
          <figure className="bg-[grey] h-[1px] w-full"></figure>
        </div>
        <div className="flex justify-between sm:justify-around text-[1.5vw] sm:text-[6px] gap-[10px] w-full compBox">
          <div className="flex w-fit justify-between px-[5px] flex-col comp">
            <div className="white-space-[nowrap] flex items-center  gap-[2px]">
              <Thick />
              <span className="whitespace-nowrap">200+ Templates</span>
            </div>
            <div className="white-space-[nowrap] flex items-center gap-[2px]">
              <Thick />
              <span className="whitespace-nowrap">24/7 Support</span>
            </div>
          </div>
          <div className="flex w-fit gap-[10px] px-[5px] flex-col comp">
            <div className="white-space-[nowrap] flex items-center gap-[2px]">
              <Thick />
              <span className="whitespace-nowrap">Unlimited Emails</span>
            </div>

            <div className="white-space-nowrap  flex items-center gap-[2px]">
              <Thick />
              <span className="whitespace-nowrap">Unlimited Automations</span>
            </div>
          </div>
        </div>

        <button className="text-[whitesmoke] bg-[#0052FF] text-[9px] py-[5px] px-[15px] rounded-[3px] mb-[10px]">
          Subscribe Now
        </button>
      </div>

      <div className="h-[180px] bg-[rgb(4,13,66)] w-full sm:w-[175px] text-[white] flex flex-col items-center justify-around rounded-[3px] self-center smallBox px-[10px]">
        <div className="font-[700] font-[Nunito] flex flex-col  items-center">
          <h2>Enterprise Plan</h2>
          <figure className="bg-white h-[1.5px] w-[50px]"></figure>
        </div>

        <div className="text-[25px] font-[800] font-[Poppins]">
          <span className="text-[15px]">$</span>
          <span>29</span>
          <span className="text-[15px]">.55</span>
        </div>

        <div className="plan w-full flex items-center gap-[5px] px-[10px] text-[grey] justify-around sm:hidden">
          <figure className="bg-[grey] h-[1px] w-full"></figure>
          <span className="whitespace-nowrap text-[9px]">
            All plans incliudes
          </span>
          <figure className="bg-[grey] h-[1px] w-full"></figure>
        </div>

        <div className="flex justify-between sm:justify-around text-[1.5vw] sm:text-[6px] gap-[10px] w-full compBox">
          <div className="flex w-fit justify-between px-[5px] flex-col comp">
            <div className="white-space-[nowrap] flex items-center  gap-[2px]">
              <Thick />
              <span className="whitespace-nowrap">200+ Templates</span>
            </div>
            <div className="white-space-[nowrap] flex items-center gap-[2px]">
              <Thick />
              <span className="whitespace-nowrap">24/7 Support</span>
            </div>
          </div>
          <div className="flex w-fit gap-[10px] px-[5px] flex-col comp">
            <div className="white-space-[nowrap] flex items-center gap-[2px]">
              <Thick />
              <span className="whitespace-nowrap">Unlimited Emails</span>
            </div>

            <div className="white-space-nowrap  flex items-center gap-[2px]">
              <Thick />
              <span className="whitespace-nowrap">Unlimited Automations</span>
            </div>
          </div>
        </div>
        <button
          className="text-[whitesmoke] bg-[#0052FF] text-[9px] py-[5px] px-[15px] rounded-[3px] mb-[10px]"
          // className={
          //   window.innerWidth <= `${500}px`
          //     ? 'text-[green] bg-[yellow] text-[9px] py-[5px] px-[15px] rounded-[10px] mb-[10px]'
          //     : 'text-[whitesmoke] bg-[#0052FF] text-[9px] py-[5px] px-[15px] rounded-[3px] mb-[10px]'
          // }
        >
          Subscribe Now
        </button>
      </div>
    </div>
  )
}

export default Cardbox
