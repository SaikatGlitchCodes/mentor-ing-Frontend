import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import RequestATutor from "./Pages/RequestATutor";
import OnlineTutors from "./Pages/OnlineTutors";
import EmailLinkAuth from "./Pages/EmailLinkAuth";
import MyRequests from "./Pages/MyRequests";
import Home from "./Pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { usePost } from "./hook/useFetch";
import AllJobs from "./Pages/AllJobs";
import ProfileModal from "./Component/Shared/ProfileModal";

const { default: Layout } = require("./Layout");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>,
  },
  {
    path: "/all-jobs",
    element: <Layout><AllJobs /> </Layout>
  },
  {
    path: "/request-a-tutor",
    element: <Layout><RequestATutor /></Layout>,
  },
  {
    path: "/online-tutors",
    element: <Layout> <OnlineTutors /> </Layout>,
  },
  {
    path: '/email-link-auth-screen',
    element: <EmailLinkAuth />
  },
  {
    path: '/my-request',
    element: <ProtectedRoute>
      <Layout>
        <MyRequests />
      </Layout>
    </ProtectedRoute>
  }
]);

const App = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { post, loading, error } = usePost();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      console.log(!user?.phoneNumbers.length || !user.fullName)
      if (!user.fullName || !user.phoneNumbers.length) {
        document.getElementById('profile_modal').showModal();
      } else {
        post('/users', {
          user_id: user.id,
          email: user.primaryEmailAddress.emailAddress,
          name: user.fullName,
          profile_img: user.imageUrl,
          status: "active",
          role: "user",
        })
      }
    }
  }, [isLoaded, isSignedIn, user, post]);

  if (!isLoaded) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <RouterProvider router={router} />
      <ProfileModal modal_id="profile_modal" closeBtn={true} />
    </>
  );
}

export default App;
