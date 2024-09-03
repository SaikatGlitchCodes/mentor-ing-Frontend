import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import RequestATutor from "./Pages/RequestATutor";
import OnlineTutors from "./Pages/OnlineTutors";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
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
]);

const App = () => <Provider store={store}>
  <RouterProvider router={router} />
</Provider>

export default App;
