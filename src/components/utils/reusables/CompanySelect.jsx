const CompanySelect = ({ disabled, label, error, register, elements }) => {
  return (
    <div className="grid gap-1 w-full">
      <div className="grid gap-1">
        <div
          className={
            error
              ? 'relative flex flex-col bg-transparent border-2 rounded-3xl border-red-600 my-4'
              : 'relative flex flex-col bg-transparent border-2 rounded-3xl border-[#B1BBC6] my-4'
          }
        >
          <p className="font-semibold text-xs py-2 px-3 bg-white absolute -top-[1.1rem] left-7 uppercase text-[#2D80E0] min-w-max">
            {label}
          </p>
          <select
            className="w-full py-3 px-3 outline-none bg-inherit rounded-sm no-number-arrows cursor-pointer text-sm"
            {...register}
            disabled={disabled}
          >
            {elements?.map((element, index) => (
              <option key={index}>{element}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default CompanySelect
