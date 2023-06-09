import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:7004/api",
});

export default Api;