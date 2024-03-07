import open_mobile_img from '../../../assets/images/inbox/OpenMobile.png'
import bk1 from '../../../assets/images/inbox/bk1.png'
import bk2 from '../../../assets/images/inbox/bk2.png'
import open_img from '../../../assets/images/inbox/open.png'

const Open = () => {
  return (
    <div className="flex flex-col gap-[20px] items-center justify-center  px-[10%] pt-10">
      <div className="hidden sm:flex shadow-[0px_1px_2px_grey] sm:visible w-full self-center h-[80vh] h relative">
        <img
          src={open_img}
          alt="open image"
          className="w-[90%] sm:w-[85%] h-[70%]  self-center z-[-1] my-[6%] object-contain"
        />
        <img
          src={bk2}
          alt="left"
          className="absolute left-[50%] top-[8%] w-[170px] object-contain"
        />
        <img
          src={bk1}
          alt="right"
          className="absolute w-[200px] top-[52%] left-[5%]"
        />
      </div>

      <img
        src={open_mobile_img}
        alt="Open image"
        className=" sm:w-[85%] h-[60%] flex sm:hidden  self-center my-[6%]"
      />
    </div>
  )
}

export default Open
