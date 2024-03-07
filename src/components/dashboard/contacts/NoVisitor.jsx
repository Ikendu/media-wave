import Image from '../../../assets/images/contacts/client.png'

const NoVisitor = () => {
  return (
    <div className="pt-10">
      <div className="shadow-xl overflow border rounded-sm w-[100%] h-[105vh] pb-48 flex flex-col justify-center items-center my-5 pt-56 gap-10">
        <div className="flex space-y-2 flex-col px-3">
          <div>
            <span className="text-2xl font-light text-[#847D7D]">
              You have no visitors yet, but don&apos;t worry !
            </span>
          </div>
          <div className="flex flex-col justify-center items-center text-lg text-[#847D7D] font-light">
            <span>Get in touch with everyone you&apos;re connected with,</span>
            <span>Start by importing your existing contacts or create</span>
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

export default NoVisitor
