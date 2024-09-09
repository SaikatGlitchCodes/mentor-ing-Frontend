import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import RequestATutor from "./Pages/RequestATutor";
import OnlineTutors from "./Pages/OnlineTutors";
import EmailLinkAuth from "./Pages/EmailLinkAuth";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { useUser } from '@clerk/clerk-react'
import Home from "./Pages/Home";

const { default: Layout } = require("./Layout");

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
  const { isLoaded } = useUser();
  if (!isLoaded) {
    return <h1>Loading...</h1>
  }
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
