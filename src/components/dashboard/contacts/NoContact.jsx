import AddIcon from '@mui/icons-material/Add'
import Image from '../../../assets/images/contacts/client.png'

const NoContact = ({ handleClick }) => {
  return (
    <div className="pt-10">
      <div className="shadow-xl overflow-hidden border rounded-sm w-[100%] h-[100vh] pb-48 flex flex-col justify-center items-center my-5 pt-56 gap-10">
        <div className="flex space-y-2 flex-col">
          <div>
            <span className="text-2xl font-light text-[#847D7D]">
              You have no contacts yet, but don&apos;t worry !
            </span>
          </div>
          <div className="flex flex-col justify-center items-center text-lg text-[#847D7D] font-light">
            <span>Get in touch with everyone you&apos;re connected with,</span>
            <span>Start by importing your existing contacts or create</span>
            <span>new connections by clicking the Property button.</span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-[#225EA3] font-light text-lg">
              Ready to build your network?
            </span>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleClick}
              className="outline-none font-semibold w-[40%] text-sm text-white rounded-lg bg-[#3e7ede] border-2 border-[#3e7ede] p-3 shadow-lg z-20"
            >
              Add Contact <AddIcon />
            </button>
          </div>
        </div>
        <div>
          <img
            src={Image}
            alt=""
            className="w-[520px] h-[360px]"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

export default NoContact
