import solved_mobile_img from '../../../assets/images/inbox/SolvedMobile.png'
import bk3 from '../../../assets/images/inbox/bk3.png'
import solved_img from '../../../assets/images/inbox/solved.png'

const Solved = () => {
  return (
    <div className="flex flex-col gap-[20px] items-center justify-center h-screen px-[10%] pt-10">
      <div className="hidden sm:flex shadow-[0px_1px_2px_grey] sm:visible w-full self-center h-[80vh] h relative">
        <img
          src={solved_img}
          alt=""
          className="w-[90%] sm:w-[85%] h-[70%]  self-center z-[-1] my-[6%]"
        />

        <img
          src={bk3}
          alt=""
          className="absolute w-[200px] top-[60%] left-[60%]"
        />
      </div>

      <img
        src={solved_mobile_img}
        alt=""
        className="h-[60%] flex sm:hidden  self-center my-[6%]"
      />
    </div>
  )
}

export default Solved
