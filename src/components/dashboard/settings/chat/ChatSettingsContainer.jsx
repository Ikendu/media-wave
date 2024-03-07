import WidgetAppearance from './WidgetAppearance'
import WidgetVisibility from './WidgetVisibility'

const ChatSettingsContainer = ({ setAllValues, newCompany: company }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center py-2 border-b-2">
        <p className="text-[#030229] font-semibold">Chat</p>
      </div>
      <WidgetAppearance setAllValues={setAllValues} company={company} />
      <WidgetVisibility setAllValues={setAllValues} company={company} />
    </div>
  )
}

export default ChatSettingsContainer
