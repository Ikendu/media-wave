const CompanyInput = ({
  type,
  placeholder,
  disabled,
  label,
  error,
  register,
  accept,
  inputType,
}) => {
  return (
    <div className="grid gap-1">
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
          {inputType !== 'textarea' ? (
            <input
              className="w-full py-3 px-3 outline-none border-none bg-inherit rounded-3xl no-number-arrows text-sm"
              type={type}
              placeholder={placeholder}
              {...register}
              disabled={disabled}
              accept={accept}
            />
          ) : (
            <textarea
              className="w-full h-[14rem] py-3 px-3 outline-none bg-inherit rounded-sm no-number-arrows text-sm no-scrollbar"
              placeholder={placeholder || ''}
              type={'text'}
              {...register}
              disabled={disabled}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CompanyInput
