import axios from "axios";
import { ENV, STORAGE_KEY } from "@/config"

const skipEmptyParam = (obj: Record<string, unknown>) => {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      delete obj[propName];
    }
  }
  return obj
}

const callApi = axios.create({
  headers: { Accept: "application/json" },
  baseURL: `${ENV.API_BASE_URL}`,
});

callApi.interceptors.request.use(
  async (config) => {

    if (config.params) {
      config.params = skipEmptyParam(config.params);
    }

    config.params = {
      ...config.params,
      language: localStorage.getItem(STORAGE_KEY.LANGUAGE) || "en-US",
    }

    if (config.headers?.Authorization) {
      return config;
    }

    const accessToken = ENV.ACCESS_TOKEN;

    Object.assign(config.headers, {
      Authorization: `Bearer ${accessToken}`,
    });

    return config;
  },
  async (error) => {
    console.error(error)
    return Promise.reject(error)
  },
);

callApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    const errorMessage = error.response?.data?.error;

    const unAuthorize = error.response?.data?.statusCode === 401 || [
      "Token is expired",
      "Access token expired!"
    ].includes(errorMessage);

    if (unAuthorize && !config?.hasReqestRefreshToken) {
      config.hasReqestRefreshToken = true;
      // TO DO: Action to refresh token
    }
    return Promise.reject(error);
  }
);

export default callApi;
