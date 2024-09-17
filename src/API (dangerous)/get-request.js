import axios from "axios";

const getRequest = async (url, params) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}${url}`, { params })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data)
          return response.data;
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
};

export default getRequest;
 