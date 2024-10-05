import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const BASE_URL = "http://localhost:4000"; // You can move this to an env variable

const useRequest = () => {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const executeRequest = useCallback(async (options) => {
    const {
      url,
      method = 'GET',
      data = null,
      params = null,
      headers = {},
    } = options;

    // Log request start details
    console.log(`[Request Started] ${method.toUpperCase()} ${BASE_URL}${url}`, {
      data,
      params,
      headers,
    });

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await axios({
        url: `${BASE_URL}${url}`,
        method: method.toUpperCase(),
        data,
        params,
        headers,
      });

      // Log successful response
      console.log(`[Request Success] ${method.toUpperCase()} ${BASE_URL}${url}`, response.data);

      setState({
        data: response.data,
        error: null,
        loading: false,
      });

      return response.data;
    } catch (error) {
      // Log error details
      const errorMessage = error.response?.data || error.message;
      console.error(`[Request Failed] ${method.toUpperCase()} ${BASE_URL}${url}`, errorMessage);

      setState({
        data: null,
        error: errorMessage,
        loading: false,
      });
      throw error;
    }
  }, []);

  return {
    ...state,
    executeRequest,
  };
};

// Convenience hooks for specific HTTP methods
export const useGet = () => {
  const { executeRequest, ...state } = useRequest();
  const get = useCallback((url, params, headers) => {
    console.log(`[GET] Request to ${BASE_URL}${url}`);
    return executeRequest({ url, method: 'GET', params, headers });
  }, [executeRequest]);

  return { ...state, get };
};

export const usePost = () => {
  const { executeRequest, ...state } = useRequest();
  const post = useCallback((url, data, headers) => {
    console.log(`[POST] Request to ${BASE_URL}${url} with data:`, data);
    return executeRequest({ url, method: 'POST', data, headers });
  }, [executeRequest]);

  return { ...state, post };
};

export const usePut = () => {
  const { executeRequest, ...state } = useRequest();
  const put = useCallback((url, data, headers) => {
    console.log(`[PUT] Request to ${BASE_URL}${url} with data:`, data);
    return executeRequest({ url, method: 'PUT', data, headers });
  }, [executeRequest]);

  return { ...state, put };
};

// Example of how to use the hooks:
export const useFetchData = (url, options = {}) => {
  const { get, data, error, loading } = useGet();

  useEffect(() => {
    console.log(`[Fetching Data] from ${BASE_URL}${url}`);
    get(url, options.params, options.headers);
  }, [url, options.params, options.headers]);

  return { data, error, loading };
};

export default useRequest;
