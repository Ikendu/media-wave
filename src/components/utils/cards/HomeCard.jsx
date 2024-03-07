const HomeCard = ({ title, description }) => {
  return (
    <div className="bg-[#FAFAFA] w-full md:w-[22rem] lg:w-[25rem] min-h-[12rem] max-h-[12rem] p-5 border-l-4 border-[#3366FF] rounded-sm flex flex-col gap-7">
      <p className="text-[#1F1F1F] font-semibold">{title}</p>
      <p className="text-[#2E384D] text-sm">{description}</p>
      {/* <div className="flex items-center gap-1 cursor-pointer">
        <p className="text-sm text-[#3366FF] font-semibold">Know more</p>
        <ForwardArrow />
      </div> */}
    </div>
  )
}

export default HomeCard
