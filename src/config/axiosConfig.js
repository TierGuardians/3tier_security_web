import axios from "axios";

// 기본 설정
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // 환경변수 사용
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials:true,
});


instance.interceptors.request.use(
  (config) => {
    const csrfToken = sessionStorage.getItem('csrfToken');
    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;