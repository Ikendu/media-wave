import { useSelector } from 'react-redux'
import useSWR from 'swr'

const ViewedPages = ({ details }) => {
  const { selectedCompany } = useSelector((state) => state.dashboard)

  const { data: pagesVisited } = useSWR(
    `/pages-visited/${selectedCompany}/create/?conversation_id=${details.id}`
  )

  return (
    <>
      <div className="m-4 mt-7 p-5 border shadow-lg shadow-gray-400 border-t-0 grid grid-col gap-8 text-gray-500">
        <h3 className="font-semibold">Viewed Pages</h3>
        <div>
          {pagesVisited &&
            pagesVisited.map((pages, idx) => (
              <div className="text-xs xl:text-sm" key={idx}>
                {pages?.page}
              </div>
            ))}
          {pagesVisited?.length == 0 && `No pages visited yet`}
        </div>
      </div>
    </>
  )
}

export default ViewedPages
