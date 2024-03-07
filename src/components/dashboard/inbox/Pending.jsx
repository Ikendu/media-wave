import pending_img from '../../../assets/images/inbox/Pending.png'
import pending_mobile_img from '../../../assets/images/inbox/PendingMobile.png'
import bk1 from '../../../assets/images/inbox/bk1.png'
import bk2 from '../../../assets/images/inbox/bk2.png'

const Pending = () => {
  return (
    <div className="flex flex-col gap-[20px] items-center justify-center h-screen px-[10%] pt-10">
      <div className="hidden sm:flex shadow-[0px_1px_2px_grey] sm:visible w-full self-center h-[80vh] h relative">
        <img
          src={pending_img}
          alt=""
          className="w-[90%] sm:w-[85%] h-[70%]  self-center z-[-1] my-[6%]"
        />
        <img
          src={bk2}
          alt="left"
          className="absolute left-[75%] top-[15%] w-[170px]"
        />
        <img
          src={bk1}
          alt="right"
          className="absolute w-[200px] top-[5%] left-[10%]"
        />
        <img
          src={bk2}
          alt="right"
          className="absolute w-[200px] top-[60%] left-[35%]"
        />
      </div>

      <img
        src={pending_mobile_img}
        alt=""
        className=" sm:w-[85%] h-[60%] flex sm:hidden  self-center my-[6%]"
      />
    </div>
  )
}

export default Pending
