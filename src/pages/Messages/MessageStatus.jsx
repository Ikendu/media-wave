import { CircularProgress } from '@mui/material'
import { DotvertIcon } from '../../assets/IconMessage'
import UsersDetails from './UsersDetails'

export default function MessageStatus({
  data,
  user,
  onAccept,
  rejectLoading,
  loading,
  reject,
  activePage,
  onClickOpen,
}) {
  console.log(data, activePage)
  return (
    <div className="grid grid-cols-3  ">
      <div className=" bg-white col-span-2 relative w-full overflow-scroll h-[90vh] mt-20 no-scrollbar ">
        <h3>Messages</h3>
        <div className="flex gap-2 absolute right-10">
          {/* <div className="p-2 rounded-full bg-slate-200 text-gray-600">
            <CallsIcon />
          </div>
          <div className="p-2 rounded-full bg-slate-200 text-gray-600">
            <VideoIcon />
          </div> */}
          <div className="p-2 rounded-full bg-slate-200 text-gray-600">
            <DotvertIcon />
          </div>
        </div>

        <div className="mt-10 text-gray-600 flex gap-4 items-center py-10">
          <div className="border-b w-[250px] m-4 "></div>
          {`January 23, 2024`}
        </div>

        <div className="flex flex-col gap-3 ">
          {/* {user?.id} */}

          {data?.slice(0, 3)?.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${msg?.customer && 'bg-[#605BFF]/20'}`}
            >
              <div className="flex ites-center gap-4 items-center">
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-[#7A799B]">
                    {msg?.customer}
                  </span>
                  <span>{msg?.message}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border bg-[#FAF8F8] rounded-xl p-4 mt-[200px] w-full px-10 text-gray-500">
          <div className="flex items-center justify-center gap-4">
            {activePage === 'Pending' && (
              <>
                <button
                  onClick={onAccept}
                  className="bg-[#225EA3] shadow-lg text-white px-8 p-2 rounded-xl"
                  disabled={rejectLoading}
                >
                  {loading ? (
                    <>
                      <CircularProgress
                        color="secondary"
                        thickness={10}
                        size={18}
                      />
                    </>
                  ) : (
                    'Accept'
                  )}
                </button>
                <button
                  disabled={loading}
                  onClick={reject}
                  className="bg-[#fff] border border-[#225EA3] shadow-lg text-[#225EA3] px-8 p-2 rounded-xl"
                >
                  {rejectLoading ? (
                    <>
                      <CircularProgress
                        color="secondary"
                        thickness={10}
                        size={18}
                      />
                    </>
                  ) : (
                    'Reject'
                  )}
                </button>
              </>
            )}
            {activePage === 'Solved' && (
              <button
                onClick={() => onClickOpen('open')}
                className="bg-[#225EA3] shadow-lg text-white px-8 p-2 rounded-xl"
                disabled={rejectLoading}
              >
                {loading ? (
                  <>
                    <CircularProgress
                      color="secondary"
                      thickness={10}
                      size={18}
                    />
                  </>
                ) : (
                  'Open'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      <UsersDetails details={user} />
    </div>
  )
}
