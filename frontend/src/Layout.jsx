import {Outlet} from 'react-router-dom';
import Navbar from './shared/components/Navbar';


const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-primary" >
      <Navbar />
      <main className='flex-1 bg-primary p-4'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;