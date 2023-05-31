import axios from "axios";

const agent = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL!}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("process.env.NEXT_PUBLIC_API_URL", process.env.NEXT_PUBLIC_API_URL);

export default agent;
