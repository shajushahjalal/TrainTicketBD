import axios from "axios";
import { startLoading, stopLoading } from "../components/Loader/loadingBar";
import { message } from "../helper/Helper";

const base_url = "http://127.0.0.1:8000/api";
// const base_url = "https://backticlet.smshaju.com/api";
export const api_version = "/v1"

axios.defaults.baseURL = base_url + api_version;
axios.defaults.headers.common['Authorization'] = "";
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("api_token")}`;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(request => {
    startLoading()
    return request;
});

axios.interceptors.response.use(response => {
    stopLoading();
    return response;
},
error => {
    stopLoading();
    message(error?.response?.data?.error?.messages[0] ?? "Unprocessable Content", true);
});

export default axios;