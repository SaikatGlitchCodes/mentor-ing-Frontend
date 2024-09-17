import axios from "axios";
import toast from "react-hot-toast";

const postRequest = async (url, data, success) => {
  return toast.promise(
    axios.post(`${process.env.REACT_APP_BACKEND_URL}${url}`, data).then(response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }),
    {
      loading: 'Saving...',
      success: <b>{success}!</b>,
      error: (err) => {
        console.error("Error:", err.message);
        return <b>Could not submit request. We have let developer know it 😉</b>;
      },
    }
  );
};

export default postRequest;