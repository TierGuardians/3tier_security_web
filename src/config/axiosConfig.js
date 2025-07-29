import axios from "axios";

// 기본 설정
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // 환경변수 사용
  headers: {
    "Content-Type": "application/json"
  }
});

// 요청 인터셉터: accessToken 자동 추가
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;