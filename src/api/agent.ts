import axios from "axios";

const agent = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL!}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

agent.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("------------------");

    console.log("error", error);

    console.log("------------------");

    // if (error.response.status === 401) {
    //   store.dispatch(logout());
    // }
    return Promise.reject(error);
  }
);

export default agent;
