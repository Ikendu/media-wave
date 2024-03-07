import bg_image from '../../assets/images/application/application_bg.png'

export default function Header() {
  return (
    <div className="relative">
      <div className="relative h-screen py-[40px] overflow-hidden">
        <img
          className="object-cover w-full h-full absolute top-0 left-0 z-[-1]"
          src={bg_image}
          alt=""
        />
        <div className="flex w-2/3 m-auto -mt-[8rem] flex-col items-center justify-center h-full relative z-10 text-white pb-[5%]">
          <h1 className="text-[60px] font-bold mb-1 text-center">
            Smart <br /> Applications
          </h1>
          <p className="text-lg text-center">
            Grab our app now, available on both Play Store and App Store!
          </p>
        </div>
      </div>
    </div>
  )
}
