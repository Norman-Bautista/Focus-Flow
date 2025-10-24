import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Landing from './pages/Landing.jsx';
import Pomodoro from './pages/Pomodoro.jsx';
import Calendar from './pages/Calendar.jsx';
import Insights from './pages/Insights.jsx';
import Settings from './pages/Settings.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import PrivateRoute from './shared/components/PrivateRoute.jsx';
import { useAuth } from './contexts/AuthContext.jsx';

function App() {
  const { user } = useAuth();

  const router = createBrowserRouter([
    // Landing page - accessible to all users
    {
      path: '/',
      element: user ? <Navigate to="/pomodoro" replace /> : <Landing />,
    },
    // Protected app routes - only accessible when logged in
    {
      path: '/app',
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="/app/pomodoro" /> },
        {
          path: 'pomodoro',
          element: (
            <PrivateRoute>
              <Pomodoro />
            </PrivateRoute>
          ),
        },
        {
          path: 'calendar',
          element: (
            <PrivateRoute>
              <Calendar />
            </PrivateRoute>
          ),
        },
        {
          path: 'insights',
          element: (
            <PrivateRoute>
              <Insights />
            </PrivateRoute>
          ),
        },
        {
          path: 'settings',
          element: (
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          ),
        },
      ],
    },
    // Auth routes - redirect to app if already logged in
    {
      path: '/login',
      element: user ? <Navigate to="/app/pomodoro" replace /> : <Login />,
    },
    {
      path: '/signup',
      element: user ? <Navigate to="/app/pomodoro" replace /> : <Signup />,
    },
    // Legacy redirects for backward compatibility
    {
      path: '/pomodoro',
      element: user ? <Navigate to="/app/pomodoro" replace /> : <Navigate to="/" replace />,
    },
    {
      path: '/calendar',
      element: user ? <Navigate to="/app/calendar" replace /> : <Navigate to="/" replace />,
    },
    {
      path: '/insights',
      element: user ? <Navigate to="/app/insights" replace /> : <Navigate to="/" replace />,
    },
    {
      path: '/settings',
      element: user ? <Navigate to="/app/settings" replace /> : <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

