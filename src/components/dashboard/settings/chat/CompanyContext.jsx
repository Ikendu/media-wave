// import { createContext, useEffect, useState } from 'react'
// import { Cookies } from 'react-cookie'

// export const CompanyContext = createContext({})

// const CompanyContextProvider = ({ children }) => {
//   const [newCompany, setNewCompany] = useState(``)

//   useEffect(() => {
//     const intId = setTimeout(() => {
//       const cookie = new Cookies()
//       const company = cookie.get(`company`)
//       if (company) setNewCompany(company)
//     }, 2000)
//     return () => clearTimeout(intId)
//   }, [newCompany])

//   return (
//     <CompanyContext.Provider value={{ company: newCompany, setNewCompany }}>
//       {children}
//     </CompanyContext.Provider>
//   )
// }
// export default CompanyContextProvider
