import Footer from './Footer'
import Header from './Header'
import NewHeader from './NewHeader'

const Layout = ({ children }) => {
  return (
    <main className="w-full overflow-hidden">
      <div className="hidden md:block">
        <NewHeader />
      </div>
      <div className="block md:hidden">
        <Header />
      </div>
      {children}
      <Footer />
    </main>
  )
}

export default Layout
