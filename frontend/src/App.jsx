import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Landing from "./pages/Landing.jsx";
import Pomodoro from "./pages/Pomodoro.jsx";
import Calendar from "./pages/Calendar.jsx";
import Insights from "./pages/Insights.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import PrivateRoute from "./shared/components/PrivateRoute.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";

function App() {
  const { user } = useAuth();

  const router = createBrowserRouter([
    // Landing page
    {
      path: "/",
      element: user ? <Navigate to="/app/pomodoro" replace /> : <Landing />,
    },
    // Protected app routes
    {
      path: "/app",
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="/app/pomodoro" /> },
        { path: "/pomodoro", element: <PrivateRoute><Pomodoro /></PrivateRoute> },
        { path: "/calendar", element: <PrivateRoute><Calendar /></PrivateRoute> },
        { path: "/insights", element: <PrivateRoute><Insights /></PrivateRoute> },
      ],
    },
    // Auth routes
    {
      path: "/login",
      element: user ? <Navigate to="/app/pomodoro" replace /> : <Login />,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/app/pomodoro" replace /> : <Signup />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
