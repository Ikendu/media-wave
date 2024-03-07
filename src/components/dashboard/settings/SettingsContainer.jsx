import DepartmentSettings from './DepartmentSettings'
import OperatorSettings from './OperatorSettings'
import ProfileSettingsContainer from './ProfileSettingsContainer'
import MainChatSettings from './chat/MainChatSettings'

const SettingsContainer = ({ setting }) => {
  return (
    <>
      {setting === 'profile' ? (
        <>
          <div className="bg-[#F7F7F8] h-[100vh] flex flex-col mx-4">
            <div className="bg-white py-8 flex justify-between items-center">
              <p className="text-[#030229] lg:text-lg font-medium min-w-max">
                Profile Settings
              </p>
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto no-srcollbar p-2 md:p-5 lg:p-10 pt-0 h-full">
              <ProfileSettingsContainer />
            </div>
          </div>
        </>
      ) : setting === 'operators' ? (
        <>
          <div className="bg-[#F7F7F8] h-fit flex flex-col mx-4">
            <div className="bg-white py-8 flex justify-between items-center">
              <p className="text-[#030229] lg:text-lg font-medium min-w-max">
                Teams Settings
              </p>
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto p-2 md:p-5 lg:p-10 pt-0 h-full shadow-lg rounded-lg">
              <OperatorSettings />
            </div>
          </div>
        </>
      ) : setting === 'departments' ? (
        <>
          <div className="bg-[#F7F7F8] h-fit mx-4 rounded-md flex flex-col">
            <div className="bg-white py-8 flex justify-between items-center">
              <p className="text-[#030229] lg:text-lg font-medium min-w-max">
                Departments
              </p>
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto p-2 md:p-5 lg:p-10 pt-0 h-full">
              <DepartmentSettings />
            </div>
          </div>
        </>
      ) : setting === 'chat' ? (
        <>
          <div className="bg-[#F7F7F8] h-[100vh] flex flex-col mx-4">
            <div className="bg-white py-8 flex justify-between items-center">
              <p className="text-[#030229] lg:text-lg font-medium min-w-max">
                Project Settings
              </p>
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar p-2 md:p-5 lg:p-7 pt-0 h-full">
              <MainChatSettings />
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default SettingsContainer
