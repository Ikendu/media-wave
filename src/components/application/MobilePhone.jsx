import AppleIcon from '@mui/icons-material/Apple'
import application_phone from '../../assets/images/application/application_phone.png'
import playstore_img from '../../assets/images/application/playstore.png'

export default function MobilePhone() {
  return (
    <div className="relative z-index-[1] ">
      <img
        className="-mt-[25rem] w-2/4 h-full mx-auto"
        src={application_phone}
        alt=""
      />
      <div className="w-2/4 mx-auto flex flex-col justify-center items-center gap-4">
        <div className="flex gap-6 text-white mt-5 mb-5">
          <button className="bg-[#000] flex md:w-56 p-2 rounded-xl">
            <AppleIcon style={{ fontSize: '50px' }} />
            <span className="text-xs md:text-sm font-semibold my-auto">
              Download on the App Store
            </span>
          </button>
          <button className="bg-[#000] flex items-center w-56 p-2 rounded-xl">
            <img src={playstore_img} />
            <span className="text-xs md:text-sm font-semibold my-auto">
              Download on the PlayStore
            </span>
          </button>
        </div>

        {/* <h2 className="text-[#06364D] text-2xl text-center mt-10">
          Nam sollicitudin dignissim nunc, cursus ullamcorper eros vulputate
          sed. .
        </h2>
        <button className="text-[#2D80E0] p-2 shadow-lg mb-10 mx-auto w-fit rounded-lg">
          Download Apps on google Play
        </button> */}
      </div>
    </div>
  )
}
