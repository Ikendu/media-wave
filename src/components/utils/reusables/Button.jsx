const Button = ({ children, eventHandler, type, loading }) => {
  const styles = {
    main: `flex items-center justify-center w-full outline-none font-semibold text-base text-white rounded-sm bg-[#3e7ede] border-2 border-[#3e7ede] py-3 px-3 shadow-md`,
  }

  return (
    <button
      onClick={eventHandler}
      type={type}
      disabled={loading}
      className={styles?.main}
    >
      {children}
    </button>
  )
}

export default Button
