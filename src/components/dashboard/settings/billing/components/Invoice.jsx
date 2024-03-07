const PaidStatus = () => {
  return (
    <div className="flex items-start justify-start  w-[20%] space-x-5">
      <span className="px-6 p-2 bg-[#B9D2EF] rounded-full">
        <span>Paid</span>
      </span>
      <div>
        <span className="text-xl text-gray-600">...</span>
      </div>
    </div>
  )
}

const NotPaidStatus = () => {
  return (
    <div className="flex items-start justify-start  w-[20%] space-x-5">
      <span className="px-6 p-2 text-[#EE3C51] bg-[#F2E0E0] rounded-full">
        <span>Not Paid</span>
      </span>
      <div>
        <span className="text-xl text-gray-600">...</span>
      </div>
    </div>
  )
}

const PendingStatus = () => {
  return (
    <div className="flex items-start justify-start  w-[20%] space-x-5">
      <span className="px-6 p-2 text-[#E2B102] bg-[#FFF5DC] rounded-full">
        <span>Pending</span>
      </span>
      <div>
        <span className="text-xl text-gray-600">...</span>
      </div>
    </div>
  )
}

const getFormattedDate = (date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const d = new Date(date)
  const day = d.getDate()
  const month = d.getMonth() + 1
  const year = d.getFullYear()

  const formattedDay = day < 10 ? '0' + day : day

  const monthName = months[month - 1]

  return formattedDay + ' ' + monthName + ', ' + year
}

const Invoice = ({ invoice }) => {
  return (
    <div className="px-8 flex justify-between text-sm items-center bg-white p-3">
      <span className="w-[15%]">#{invoice?.id?.substring(0, 6)}</span>
      <span className="w-[15%]">{getFormattedDate(invoice.created_at)}</span>
      <span className="w-[15%]">{invoice?.plan?.name} Plan</span>
      <span className="w-[15%]">${invoice?.plan?.price}</span>
      {(invoice.status === 'active' || invoice.status === 'initiated') && (
        <PaidStatus />
      )}
      {invoice.status === 'pending' && <PendingStatus />}
      {(invoice.status === 'inactive' || invoice.status === 'expired') && (
        <NotPaidStatus />
      )}
      {invoice.status === '' && <NotPaidStatus />}
    </div>
  )
}

export default Invoice
