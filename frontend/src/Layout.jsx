import {Outlet} from 'react-router-dom';
import Navbar from './shared/components/Navbar';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className='bg-primary h-dvh'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;