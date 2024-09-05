import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import RequestATutor from "./Pages/RequestATutor";
import OnlineTutors from "./Pages/OnlineTutors";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import Home from "./Pages/Home";
import { Navigate } from 'react-router-dom';
import { useAuth } from "./customHook/useAuth";
import EmailLinkAuth from "./Pages/EmailLinkAuth";

const { default: Layout } = require("./Layout");

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout> <Home /> </Layout>,
  },
  {
    path: "/request-a-tutor",
    element: <Layout> <RequestATutor /> </Layout>,
  },
  {
    path: "/online-tutors",
    element: <Layout> <OnlineTutors /> </Layout>,
  },
  {
    path: '/email-link-auth-screen',
    element: <EmailLinkAuth/>
  }
]);

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
