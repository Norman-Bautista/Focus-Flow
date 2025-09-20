
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Pomodoro from './pages/Pomodoro.jsx';
import Calendar from './pages/Calendar.jsx';
import Insights from './pages/Insights.jsx';
import Settings from './pages/Settings.jsx';
import Auth from './pages/Auth.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {index: true, element: <Navigate to ="/pomodoro"/> ,},
      {path: 'auth', element: <Auth />,},
      {path: 'pomodoro', element: <Pomodoro />,},
      {path: 'calendar', element: <Calendar />,},
      {path: 'insights', element: <Insights />,},
      {path: 'settings', element: <Settings />,},
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
export default App;
