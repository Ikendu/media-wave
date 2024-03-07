import Appearance from './Appearance'

const ChatPageSettings = ({ newCompany: company }) => {
  return (
    <div className="flex flex-col gap-5 mb-10">
      <div className="flex justify-between items-center py-2 border-b-2">
        <p className="text-[#030229] font-semibold">Chat Page</p>
      </div>
      <Appearance company={company} />
    </div>
  )
}

export default ChatPageSettings
