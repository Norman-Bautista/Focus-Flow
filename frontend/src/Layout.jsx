import {Outlet} from 'react-router-dom';
import Navbar from './shared/components/Navbar';


const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-primary" >
      <Navbar />
      <main className='min-h-screen container mx-auto px-4 sm:px-6 md:px-8 py-6 
                      flex flex-col lg:flex-row gap-6'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;