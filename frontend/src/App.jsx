
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        
      },
      {
        
      }
    ]
  }
]);

function App() {
  
  return (
    <>
      return <RouterProvider router={router} />;
    </>
  )
}

export default App;
