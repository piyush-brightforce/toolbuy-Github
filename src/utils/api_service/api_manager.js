import axios from "axios";

class APIManager {
  constructor() {
    this.api = axios.create({
      baseURL: "https://api.yourserver.com/",
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.initializeResponseInterceptor();
  }

  initializeResponseInterceptor() {
    this.api.interceptors.response.use(
      response => response.data,
      error => {
        if (error.response) {
          return Promise.reject(error.response.data);
        }
        return Promise.reject({
          message: "Network Error",
        });
      }
    );
  }

  setAuthToken(token) {
    this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  clearAuthToken() {
    delete this.api.defaults.headers.common["Authorization"];
  }

  get(url, params = {}) {
    return this.api.get(url, { params });
  }

  post(url, data = {}) {
    return this.api.post(url, data);
  }

  put(url, data = {}) {
    return this.api.put(url, data);
  }

  delete(url) {
    return this.api.delete(url);
  }
}

export default new APIManager();