const SelectComponent = ({ disabled, label, error, register, elements }) => {
  return (
    <div className="grid gap-1 w-full">
      <p className="text-gray-800 font-medium text-sm">{label}</p>
      <div className="grid gap-1">
        <div
          className={
            error
              ? 'relative flex items-center bg-transparent border border-red-600 rounded-sm text-[#010101] text-base w-full mb-4'
              : 'relative flex items-center bg-transparent border rounded-sm text-[#010101] text-base w-full mb-4'
          }
        >
          <select
            className="w-full py-3 px-3 outline-none bg-inherit rounded-sm no-number-arrows cursor-pointer"
            {...register}
            disabled={disabled}
          >
            {elements?.map((element, index) => (
              <option key={index}>{element?.country || element}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default SelectComponent
