const TextareaComponent = ({
  placeholder,
  disabled,
  label,
  error,
  register,
  accept,
}) => {
  return (
    <div className="grid gap-1">
      <p className="text-gray-800 font-medium text-sm">{label}</p>
      <div className="grid gap-1">
        <div
          className={
            error
              ? 'relative flex items-center bg-transparent border border-red-600 rounded-sm mb-4'
              : 'relative flex items-center bg-transparent border rounded-sm mb-4'
          }
        >
          <textarea
            className="w-full py-2 px-2 outline-none bg-inherit rounded-sm no-number-arrows h-[8rem]"
            placeholder={placeholder}
            {...register}
            disabled={disabled}
            accept={accept}
          />
        </div>
      </div>
    </div>
  )
}

export default TextareaComponent
