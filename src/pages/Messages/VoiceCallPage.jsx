//import Mic from './Icons/Mic.svg'
import DotVert from './Icons/DotVert.svg'
import attarch from './Icons/attarch.svg'
import call from './Icons/call.svg'
import camSlach from './Icons/camSlach.svg'
import micblack from './Icons/micblack.svg'
import microphone from './Icons/microphone.svg'
import minimise from './Icons/minimize.svg'
import smile2 from './Icons/smile2.svg'
import voice from './Icons/voice.svg'

const VoiceCallPage = ({ setOpenCall }) => {
  return (
    <div className="bg-[#1b1349] pb-[0.5px] mt-20 mr-2">
      <div className="text-gray-100  p-5 m-10 text-sm ">
        <div className="flex justify-between ">
          <div className="flex gap-5">
            <p className="px-6 py-2 bg-[#0f0f3a] rounded-lg ">Evans David</p>
            <div className="px-6 py-2 bg-[#0f0f3a] rounded-lg flex gap-2 items-center ">
              <div className="bg-gray-300 p-2 rounded-full">
                <div className="bg-[#EB5757] p-1 rounded-full"></div>
              </div>{' '}
              <p>24:13:03</p>
            </div>
          </div>

          <div
            className="bg-[#0f0f3a] p-1 rounded-full "
            onClick={() => setOpenCall(false)}
          >
            <img src={minimise} />
          </div>
        </div>
      </div>
      <div className="border border-[#429AFF] relative  border-1 p-3 bg-[#0f0f3a] m-auto justify-center rounded-full flex w-52 ">
        <div className="p-14 px-[70px]  bg-[#706060] rounded-full flex text-6xl font-semibold text-[#a5988d]">
          S
        </div>
        <div className="absolute bottom-10 right-14 p-2 bg-red-600 rounded-full w-8">
          <img src={voice} />
        </div>
      </div>
      <div className="m-5 mt-28 flex justify-between items-center ">
        <div className=" bg-[#534158] w-60">
          <div className="pt-10 px-10 text-center text-[58px] font-semibold text-gray-500">
            <p>F</p>
          </div>

          <div className="flex justify-between  text-white text-sm -mt-3">
            <p className="m-2 py-1 px-4 bg-gray-800 rounded-full">Faith Ada</p>
            <div className="m-2 p-1 rounded-full bg-red-600 cursor-pointer">
              <img src={microphone} />
            </div>
          </div>
        </div>
        <div className="flex gap-2 cursor-pointer">
          <div>
            <img src={micblack} />
          </div>
          <div>
            <img src={camSlach} />
          </div>
          <div className="p-2 rounded-full bg-slate-300">
            <img src={smile2} />
          </div>
          <div className="p-2 px-[15px] rounded-full bg-slate-300">
            <img src={attarch} />
          </div>
          <div>
            <img src={DotVert} />
          </div>
          <div onClick={() => setOpenCall(false)}>
            <img src={call} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default VoiceCallPage
